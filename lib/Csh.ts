import Nsh from './Nsh.ts'
import { isString } from './guards.ts'

class Csh {
    nshs:Array<Nsh>
    constructor(chain:{ rpc:Array<string> }) {
        this.nshs = chain.rpc.map(url => new Nsh(url))
    }
    pushIx(method:string, guard:Guard, params?:Array<unknown>) {
        for (const nsh of this.nshs) nsh.pushIx(method, guard, params)
        return this
    }
    send() {
        for (const nsh of this.nshs) nsh.send()
        return this
    }
    clientVersion() { return this.pushIx('web3_clientVersion', isString) }
    blockNumber() { return this.pushIx('eth_blockNumber', isString) }
}

export default Csh