/** @prop startingBlock - The block at which the import started (will only be reset, after the sync reached his head)
  * @prop currentBlock - The current block, same as {@link EJRA.blockNumber}
  * @prop highestBlock - The estimated highest block */
type SyncData = {
    startingBlock: string
    currentBlock: string
    highestBlock: string
}

/** @type integer block number, or the string "latest", "earliest" or "pending", see the default block parameter */
type Tag = string|'latest'|'earliest'|'pending'

/** @prop removed - true when the log was removed, due to a chain reorganization. false if its a valid log.
  * @prop logIndex -integer of the log index position in the block. null when its pending log.
  * @prop transactionIndex - integer of the transactions index position log was created from. null when its pending log.
  * @prop transactionHash - hash of the transactions this log was created from. null when its pending log.
  * @prop blockHash - hash of the block where this log was in. null when its pending. null when its pending log.
  * @prop blockNumber - the block number where this log was in. null when its pending. null when its pending log.
  * @prop address - address from which this log originated.
  * @prop data - contains zero or more 32 Bytes non-indexed arguments of the log.
  * @prop topics - Array of 0 to 4 32 Bytes DATA of indexed log arguments. (In solidity: The first topic is the hash of the signature of the event (e.g. Deposit(address,bytes32,uint256)), except you declared the event with the anonymous specifier.) */
type Log = {
    removed: boolean
    logIndex: string|null
    transactionIndex: string|null
    transactionHash: string|null
    blockHash: string|null
    blockNumber: string|null
    address: string
    data: string[]
    topics: string[]
}

/** @prop blockHash - hash of the block where this transaction was in. null when its pending.
  * @prop blockNumber - block number where this transaction was in. null when its pending.
  * @prop contractAddress - The contract address created, if the transaction was a contract creation, otherwise null.
  * @prop cumulativeGasUsed - The total amount of gas used when this transaction was executed in the block.
  * @prop data - The compiled code of a contract OR the hash of the invoked method signature and encoded parameters.
  * @prop effectiveGasPrice - The sum of the base fee and tip paid per unit of gas.
  * @prop from - The address the transaction is sent from.
  * @prop gas - Integer of the gas provided for the transaction execution. It will return unused gas.
  * @prop gasPrice - Integer of the gasPrice used for each paid gas, in Wei.
  * @prop gasUsed - The amount of gas used by this specific transaction alone.
  * @prop hash - hash of the transaction.
  * @prop logs - Array of log objects, which this transaction generated.
  * @prop logsBloom - Array of log objects, which this transaction generated.
  * @prop nonce - Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.
  * @prop r - ECDSA signature r
  * @prop root - 32 bytes of post-transaction stateroot (pre Byzantium)
  * @prop s - ECDSA signature s
  * @prop status - either 1 (success) or 0 (failure)
  * @prop to - The address the transaction is directed to.
  * @prop transactionHash -  hash of the transaction.
  * @prop transactionIndex - integer of the transactions index position in the block. null when its pending.
  * @prop type - integer of the transaction type, 0 for legacy transactions, 1 for access list types, 2 for dynamic fees.
  * @prop v - ECDSA recovery id
  * @prop value - Integer of the value sent with this transaction, in Wei. */
type Tx = {
    blockHash: string|null
    blockNumber: string|null
    contractAddress: string|null
    cumulativeGasUsed: string
    data: string
    effectiveGasPrice: string
    from: string
    gas: string
    gasPrice: string
    gasUsed: string
    hash: string
    input: string
    logs: Log[]
    logsBloom: string
    nonce: string
    r: string
    root: string
    s: string
    status: 0|1
    to: string|null
    transactionHash: string
    transactionIndex: string|null
    type: 0|1|2
    v: string
    value: string
}
type TxSign = Partial<Pick<Tx,'to'|'gas'|'gasPrice'|'value'|'nonce'>>&Pick<Tx,'from'|'data'>
type TxSend = Partial<Pick<Tx,'to'|'gas'|'gasPrice'|'value'|'nonce'>>&Pick<Tx,'from'|'input'>
type TxCall = Partial<Pick<Tx,'from'|'gas'|'gasPrice'|'value'|'input'>>&Pick<Tx,'to'>
type TxEstimateGas = Partial<TxCall>
type TxGetBy = Pick<Tx,'blockHash'|'blockNumber'|'from'|'gas'|'gasPrice'|'hash'|'input'|'nonce'|'to'|'transactionIndex'|'value'|'v'|'r'|'s'>
type TxReceipt = Pick<Tx,'transactionHash'|'transactionIndex'|'blockHash'|'blockNumber'|'from'|'to'|'cumulativeGasUsed'|'effectiveGasPrice'|'gasUsed'|'contractAddress'|'logs'|'logsBloom'|'type'|'root'|'status'>

/** @prop difficulty - integer of the difficulty for this block.
    @prop extraData - the "extra data" field of this block.
    @prop gasLimit - the maximum gas allowed in this block.
    @prop gasUsed - the total used gas by all transactions in this block.
    @prop hash - hash of the block. null when its pending block.
    @prop logsBloom - the bloom filter for the logs of the block. null when its pending block.
    @prop miner - the address of the beneficiary to whom the mining rewards were given.
    @prop nonce - hash of the generated proof-of-work. null when its pending block.
    @prop number - the block number. null when its pending block.
    @prop parentHash - hash of the parent block.
    @prop receiptsRoot - the root of the receipts trie of the block.
    @prop sha3Uncles - SHA3 of the uncles data in the block.
    @prop size - integer the size of this block in bytes.
    @prop stateRoot - the root of the final state trie of the block.
    @prop timestamp - the unix timestamp for when the block was collated.
    @prop totalDifficulty - integer of the total difficulty of the chain until this block.
    @prop transactions - Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter.
    @prop transactionsRoot - the root of the transaction trie of the block.
    @prop uncles - Array of uncle hashes. */
type Block = {
    difficulty: string
    extraData: string
    gasLimit: string
    gasUsed: string
    hash: string|null
    logsBloom: string|null
    miner: string
    nonce: string|null
    number: string|null
    parentHash: string
    receiptsRoot: string
    sha3Uncles: string
    size: string
    stateRoot: string
    timestamp: string
    totalDifficulty: string
    transactions: Tx[]|string
    transactionsRoot: string
    uncles: string[]
}

/** @param fromBlock - see {@link Tag}
 *  @param toBlock - see {@link Tag}
 *  @param address - Contract address or a list of addresses from which logs should originate.
 *  @param topics - Array of 32 Bytes DATA topics. Topics are order-dependent. Each topic can also be an array of DATA with "or" options. */
type Filter = {
    fromBlock?: Tag
    toBlock?: Tag
    address?: string|string[]
    topics?: (null|string|string[])[]
    blockhash?: string
}
type FilterNew = Omit<Filter,'blockhash'>

type EjraParams = Parameters<EjraRpc[keyof EjraRpc]>

type EjraReturns = Awaited<ReturnType<EjraRpc[keyof EjraRpc]>>

type EjraReq = {
    jsonrpc:'2.0'
    method:string
    params:EjraParams
    id:string|number|null
}

type EjraRes = {
    jsonrpc:'2.0',
    id:string|number|null
}&({
    result:EjraReturns
    error?:never
}|{
    error: {
        code:number
        message:string
        data?:unknown
    }
    results?:never
})