import { isNode, isChain, isChains, isChainsets } from './chain.ts'
import Hermes from './Hermes.ts' 

export default class ESH implements Pick<EJRA, 'clientVersion'> {

    rpc?: string
    node?: Node
    chain?: Chain
    chains?: Chain[]
    chainsets?: Chain[][]
    
    constructor(rpc:string)
    constructor(node:Node)
    constructor(chain:Chain)
    constructor(chains:Chain[])
    constructor(arg:string|Node|Chain|Chain[]|Chain[][]) {
        if (typeof arg == 'string') this.rpc = arg
        else if (isNode(arg)) this.node = arg
        else if (isChain(arg)) this.chain = arg
        else if (isChains(arg)) this.chains = arg
        else if (isChainsets(arg)) this.chainsets = arg
        else throw 'arg not Node|Chain|Chains|Chainsets'
    }
    
    #call({ method, params, dry }: { method:string, params?:unknown[], dry?: boolean }) {
        const rpc = this.rpc
            ?? this.node?.rpc
            ?? this.chain?.rpc
            ?? this.chains?.[0].rpc?.[0]
            ?? this.chainsets?.[0]?.[0].rpc?.[0]
        if (rpc === undefined) throw 'undefined rpc'
        return Hermes.call(rpc, { method, params, dry })
    }
    
    async clientVersion(dry?:boolean) {
        console.log('ESH: acquiring AIQ from Hermes')
        const response = this.#call({ method: 'web3_clientVersion', dry })
        function isRecord(x: unknown): x is Record<string,string> { x; return !!dry }
        if (isRecord(response)) return response as Record<string,string>
        const responses:Record<string,string|Error> = {}
        console.log('ESH: pulling objects from AIQ')
        if (!response[Symbol.asyncIterator]) throw '???'
        for await (const { url, res, status: _ } of response) {
            console.log('ESH: pulled value from queue', { url, res })
            if (res instanceof Error) responses[url] = res
            else if (typeof res == 'string') responses[url] = res
            else responses[url] = new Error(`invalid type: ${JSON.stringify(res)} not string`)
        }
        console.log('ESH: returning response record')
        return responses
    }
    
    // async blockNumber(): Promise<bigint>
    // async blockNumber({ dry }:{ dry:true }): Promise<string>
    // async blockNumber({ dry }:{ dry?:boolean }={}) {
    //     const response = await this.#call({ method: 'eth_blockNumber', dry }).catch(e => e instanceof Error ? e : new Error(e))
    //     if (response instanceof Error) throw response
    //     if (dry) return response as string
    //     if (typeof response != 'string') throw new Error(`invalid response: ${JSON.stringify(response)}`)
    //     return BigInt(response)
    // }
    
    // async getLogs(filter:Filter):Promise<Log[]>
    // async getLogs(filter:Filter, { dry }:{ dry:true }):Promise<string>
    // async getLogs(filter:Filter, { dry }:{ dry?:boolean }={}) {
    //     const response = await this.#call({ method: 'eth_getLogs', params: [filter], dry }).catch(e => e instanceof Error ? e : new Error(e))
    //     if (dry) return response as string
    //     if (response instanceof Error) throw response
    //     if (!(response instanceof Array)) throw new Error(`invalid response: ${JSON.stringify(response)}`)
    //     return response
    // }
    
}