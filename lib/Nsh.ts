import { isString, isArray, isJsonRpcRes, isBigIntable } from './guards.ts'

class Nsh {
    url:string
    bx:boolean // batching mode
    ixs:Ixs
    fetches:Array<Promise<this>>
    constructor(url:string, o?:{ bx?:true }) {
        this.url = url
        this.bx = o?.bx ?? false
        this.ixs = []
        this.fetches = []
    }
    get results() {
        // return a promise that waits for the last fetch to finish
        // then gather the latests results
        const ixs = this.ixs.filter(({ sent }) => sent).toReversed()
        if (!ixs.length) return []
        return new Promise(resolve => {
            this.fetches[0].finally(() => {
                const r = [ixs[0]]
                for (const ix of ixs.slice(1)) {
                    if (ix.req.id >= (r[0] as Ix).req.id) break
                    r.unshift(ix)
                }
                resolve(r.map(i => i.res ||  i.err))
            })
        })
    }
    pushIx(method:string, guard:Guard, params?:Array<unknown>) {
        if (!this.bx) for (const ix of this.ixs) if (!ix.sent) ix.pickled = true
        params = params ?? []
        const jsonrpc = '2.0' as const
        const id = this.ixs.filter(({ sent, pickled }) => !sent && !pickled).length
        const req = { jsonrpc, method, params, id }
        const ix = { req, guard }
        this.ixs.push(ix)
        return this
    }
    setBx(flag:boolean) {
        if (!flag) for (const ix of this.ixs.slice(0, -1)) if (!ix.sent) ix.pickled = true
        this.bx = flag
        return this
    }
    send() {
        // # build up what we need to send and how to handle response
        const replacer =  (_:string, v:unknown) =>
            typeof v == 'bigint'
                ? `0x${v.toString(16)}`
                : v
        // get ixs that haven't been pickled or sent
        const ixs = this.ixs.filter(({ pickled, sent }) => !pickled && !sent )
        // if ixs after filtering is empty, return
        if (!ixs.length) return this
        // map to reqs
        const reqs = ixs.map(({ req }) => req)
        const body = JSON.stringify(reqs, replacer)
        const headers = { 'Content-Type': 'application/json' }
        const method = 'POST'
        const signal = AbortSignal.timeout(5000)
        const init = { body, headers, method, signal }
        const handleRes = (res:Response) => res.json()
        const handleJson = (json:unknown) => {
            // verify response is an array
            if (!(isArray(json)))
                throw new Error('response not array', { cause: JSON.stringify(json) })
            // for each element of response array
            for (const x of json) {
                // verify that it is a JsonRpcRes
                if (!isJsonRpcRes(x)) continue
                // try to get the matching ix
                const ix = ixs.find(({ req: { id }}) => x.id == id)
                // handle if we couldn't find it
                if (ix === undefined) continue
                // handle if x was an error response
                if ('error' in x) {
                    ix.err = new Error('valid error', { cause: JSON.stringify(x) })
                    continue   
                }
                // verify guard
                if (!ix.guard(x.result)) {
                    ix.err = new Error('guard failure', { cause: JSON.stringify(x) })
                    continue
                }
                // set the result
                ix.res = x.result
            }
            // handle ix's that didn't have a res or an err set
            for (const ix of ixs.filter(({ err, res }) =>
            err === undefined && res === undefined ))
                ix.err = new Error('no response found for request',
                    { cause: JSON.stringify(json) })
            return this
        }
        const handleErr = (err:Error) => {
            for (const ix of ixs) ix.err = err
            return this
        }
        // # send
        const f = fetch(this.url, init)
            .then(handleRes)
            .then(handleJson)
            // if there's an error here, then no ix is getting processed, so set err of all
            .catch(handleErr)
        this.fetches.unshift(f)
        // # mark ixs that were sent as such
        for (const ix of ixs) ix.sent = true
        return this
    }
    clientVersion() { return this.pushIx('web3_clientVersion', isString) }
    sha3(data:string) { return this.pushIx('web3_sha3', isString, [data]) }
    blockNumber() { return this.pushIx('eth_blockNumber', isBigIntable) }
    getLogs(filter:Filter) { return this.pushIx('eth_getLogs', isArray, [filter]) }
}

export default Nsh