import Nsh from './Nsh.ts'

class Csh {
    nshs:Array<Nsh>
    constructor(chain:{ rpc:Array<string> }) {
        this.nshs = chain.rpc.map(url => new Nsh(url))
    }
    send() {
        for (const nsh of this.nshs) nsh.send()
        return this
    }
    clientVersion() { for (const nsh of this.nshs) nsh.clientVersion(); return this }
    blockNumber() { for (const nsh of this.nshs) nsh.blockNumber(); return this }
    getLogs(filter:Filter) { for (const nsh of this.nshs) nsh.getLogs(filter); return this }
}

export default Csh