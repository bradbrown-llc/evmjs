import { isNode, isChain, isChains, isChainsets } from './chain.ts'
import Hermes from './Hermes_Node.ts' 

export default class ESH_Node implements Pick<ESH_Node, 'clientVersion'> {

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
        const response = this.#call({ method: 'web3_clientVersion', dry })
        function isRecord(x: unknown): x is Record<string,string> { x; return !!dry }
        if (isRecord(response)) return response as Record<string,string>
        const responses:Record<string,string|Error> = {}
        if (!response[Symbol.asyncIterator]) throw '???'
        for await (const { url, res, status: _ } of response) {
            if (res instanceof Error) responses[url] = res
            else if (typeof res == 'string') responses[url] = res
            else responses[url] = new Error(`invalid type: ${JSON.stringify(res)} not string`)
        }
        return responses
    }
    
}