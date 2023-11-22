import rethrow from './rethrow.ts'
import Hermes from './HermesRpc.ts' 

type EjraRpc = Ejra

export default class EshRpc implements Pick<EjraRpc, 'clientVersion'|'sha3'> {

    rpc:string
    batching:boolean
    reqs:Array<JsonRpcReq>
    id:number
    
    constructor(rpc:string) { this.rpc = rpc; this.batching = false; this.reqs = []; this.id = 0 }
    batch() { this.batching = true; return this }
    request(opts:{ dry:true }):{ url:string, reqs:Array<JsonRpcReq> }
    request(opts?:{ dry?:false }):Promise<unknown>
    request(opts?:{ dry?:boolean }) {
        this.batching = false
        this.id = 0
        if (opts?.dry) return { url: this.rpc, reqs: this.reqs }
        return Hermes.request(this.rpc, this.reqs)
    }
    
    clientVersion():typeof this
    clientVersion(opts:{ dry:true }):{ url:string, req:JsonRpcReq }
    clientVersion(opts?:{ dry?:false }):Promise<string>
    clientVersion(opts?:{ dry?:boolean }) {
        const method = 'web3_clientVersion'
        const req:JsonRpcReq = { jsonrpc:'2.0', method, params: [], id: this.id }
        if (this.batching) { this.reqs.push(req); this.id++; return this }
        else if (opts?.dry) return { url: this.rpc, req }
        else return Hermes.request(this.rpc, req).then(result => {
            if (typeof result != 'string') throw new Error('invalid result')
            return result
        }).catch(rethrow)
    }
    
    sha3(data:string):typeof this
    sha3(data:string, opts:{ dry:true }):{ url:string, req:JsonRpcReq }
    sha3(data:string, opts?:{ dry?:false }):Promise<string>
    sha3(data:string, opts?:{ dry?:boolean }) {
        const method = 'web3_sha3'
        const req:JsonRpcReq = { jsonrpc:'2.0', method, params: [data], id: this.id }
        if (this.batching) { this.reqs.push(req); this.id++; return this }
        else if (opts?.dry) return { url: this.rpc, req }
        else return Hermes.request(this.rpc, req).then(result => {
            if (typeof result != 'string') throw new Error('invalid result')
            return result
        }).catch(rethrow)
    }
    
}