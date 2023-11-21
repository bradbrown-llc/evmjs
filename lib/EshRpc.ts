import rethrow from './rethrow.ts'
import Hermes from './HermesRpc.ts' 
import { isEjraRes } from './EJRA.ts'

type EshOpts = { dry?:boolean }

type EjraRpc2 = {
    [P in keyof EjraRpc]: (...p: Parameters<EjraRpc[P]>) =>
        Promise<Awaited<ReturnType<EjraRpc[P]>>|EjraReq>
}

export default class EshRpc implements Pick<EjraRpc2, 'clientVersion'> {

    rpc: string
    
    constructor(rpc:string) { this.rpc = rpc }
    
    async clientVersion(opts?:EshOpts) {
        const response = await Hermes.call(this.rpc, { method: 'web3_clientVersion', ...opts}).catch(rethrow)
        if (opts?.dry === true) return response as EjraReq
        if (!isEjraRes(response)) throw new Error('response shape not EjraRes')
        if (response.error) throw new Error('response error')
        if (typeof response.result != 'string') throw new Error('invalid result')
        return response.result
    }
    
}