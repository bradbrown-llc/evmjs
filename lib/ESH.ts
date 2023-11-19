import { isNode, isChain, isChains, isChainsets } from './chain.ts'
import Hermes from './Hermes.ts'

class ESH implements EJRA {

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
    
    get clientVersion() {
        const rpc = this.rpc
            ?? this.node?.rpc
            ?? this.chain?.rpc[0]
            ?? this.chains?.[0].rpc?.[0]
            ?? this.chainsets?.[0]?.[0].rpc?.[0]
        if (!(typeof rpc == 'string')) throw 'invalid rpc'
        const method = 'web3_clientVersion'
        
        return Hermes.get(rpc, { method })
    }
    
}