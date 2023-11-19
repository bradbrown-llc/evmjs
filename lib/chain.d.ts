type Explorer = {
    name: string,
    url: string,
    standard: 'EIP3091' | 'none'
}

type Coin = {
    name: string
    symbol: string
    decimals: bigint
}

// shape source(s), may add more and combine or simplify 
// https://github.com/ethereum-lists/chains/blob/master/model/src/main/kotlin/org/ethereum/lists/chains/model/Chain.kt
type Node = {
    name: string
    shortName: string
    chain: string
    chainId: bigint
    networkId: bigint
    rpc: string
    faucets: string[]
    explorers?: Explorer[]
    infoURL: string
    title?: string
    nativeCurrency: Coin
}
type Chain = Omit<Node,'rpc'>&{ rpc:string[] }