import Nsh from './Nsh.ts'
import AIQ from './AIQ.ts'
import AbortController2 from './AbortController2.ts'

interface Csh extends Nsh { nshs:Nsh[] }
class Csh {
    nshs:Nsh[]
    constructor(chain:{ rpc:string[] }) {
        if (!chain.rpc.length) throw 'no rpcs in chain'
        this.nshs = chain.rpc.map(url => new Nsh(url))
        const { constructor:_, ...descriptors } = Object.getOwnPropertyDescriptors(Nsh.prototype)
        // we want every method of Nsh to be available on Csh (besides constructor)
        // where using the method uses it on every Nsh of Csh.nshs
        for (const [key, desc] of Object.entries(descriptors) as [keyof Nsh,PropertyDescriptor][]) {
            const fn = (...p:unknown[]) => { for (const nsh of this.nshs) (nsh[key] as (...p:unknown[]) => unknown)(...p); return this }
            desc.value = fn
            Object.defineProperty(this, key, desc)
        }
    }
    // get [q]ueue of [l]atest network request's ixs
    get ql() {
        const aiq = new AIQ<Ix[]>({ limit: this.nshs.length })
        for (const nsh of this.nshs) {
            const ixs:Ix[] = []
            for (const ix of nsh.ixs)
                if (ix.req.id < (ixs.at(-1)?.req?.id ?? Infinity))
                    ixs.push(ix)
                else break
            nsh.fetches[0].then(() => aiq.push(ixs))
        }
        return aiq
    }
    // send and return [ [q]ueue of [l]atest network request's ixs, abort (to abort the send) ]
    sendql(o?:{ timeout:number }) {
        const controller = new AbortController2(o)
        const signal = controller.signal2
        this.send({ signal })
        return [this.ql, () => controller.abort()] as const
    }
    sendfold(fn:(aiq:AIQ<Ix[]>, abort:() => void) => unknown, o?:{ timeout:number }) { return fn(...this.sendql(o)) }
    first(o?:{ timeout:number }):Promise<unknown> {
        return this.sendfold(async (aiq, abort) => {
            const errors:Error[] = []
            for await (const [{ res, err }] of aiq) {
                if (err) { errors.push(err); continue }
                if (res) { abort(); return res }
            }
            throw new AggregateError(errors)
        }, o) as Promise<unknown>
    }
}

export default Csh