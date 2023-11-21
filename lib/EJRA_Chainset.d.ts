interface EJRA_Chainset {

    /** Returns the current client version.
      * @returns The current client version */
    clientVersion: () => Promise<Record<string,string|Error>>
    
    /** Returns Keccak-256 (not the standardized SHA3-256) of the given data.
      * @param data - the data to convert into a SHA3 hash
      * @returns The SHA3 result of the given string. */
    sha3: (data:string) => Promise<Record<string,string>>
    
    /** Returns the current network id.
      * @returns The current network id. */
    version: () => Promise<Record<string,string>>
    
    /** Returns true if client is actively listening for network connections.
      * @returns true when listening, otherwise false. */
    listening: () => Promise<Record<string,boolean>>
    
    /** Returns number of peers currently connected to the client.
      * @returns integer of the number of connected peers. */
    peerCount: () => Promise<Record<string,bigint>>
    
    /** Returns the current Ethereum protocol version. Note that this method is not available in Geth.
      * @returns The current Ethereum protocol version */
    protocolVersion: () => Promise<Record<string,string>>
    
    /** Returns an object with data about the sync status or false.
      * @returns The precise return data varies between client implementations. All clients return False when the node is not syncing, and all clients return the following fields (see {@link SyncData}). The individual clients may also provide additional data. */
    syncing: () => Promise<Record<string,false|SyncData>>
    
    /** Returns the client coinbase address.
      * @returns the current coinbase address. */
    coinbase: () => Promise<Record<string,string>>
    
    /** Returns the chain ID used for signing replay-protected transactions.
      * @returns bigint representing the current chain id. */
    chainId: () => Promise<Record<string,bigint>>
    
    /** Returns true if client is actively mining new blocks. This can only return true for proof-of-work networks and may not be available in some clients since The Merge.
      * @returns returns true of the client is mining, otherwise false. */
    mining: () => Promise<Record<string,boolean>>
    
    /** Returns the number of hashes per second that the node is mining with. This can only return true for proof-of-work networks and may not be available in some clients since The Merge.
      * @returns number of hashes per second. */
    hashrate: () => Promise<Record<string,bigint>>
    
    /** Returns an estimate of the current price per gas in wei. For example, the Besu client examines the last 100 blocks and returns the median gas unit price by default.
      * @returns integer of the current gas price in wei. */
    gasPrice: () => Promise<Record<string,bigint>>
    
    /** Returns a list of addresses owned by client.
      * @returns addresses owned by the client. */
    accounts: () => Promise<Record<string,string[]>>
    
    /** Returns the number of most recent block.
      * @returns integer of the current block number the client is on. */
    blockNumber: () => Promise<Record<string,string|bigint|Error>>
    
    /** Returns the balance of the account of given address.
      * @param address - address to check for balance.
      * @param tag - see {@link Tag}
      * @returns integer of the current balance in wei. */
    getBalance: (data:string, tag:Tag) => Promise<Record<string,bigint>>
    
    /** Returns the value from a storage position at a given address.
      * @param address - address of the storage.
      * @param slot - integer of the position in the storage.
      * @param tag - see {@link Tag}
      * @returns the value at this storage position. */
    getStorageAt: (address:string, slot:bigint, tag:Tag) => Promise<Record<string,string>>
    
    /** Returns the number of transactions sent from an address.
      * @param address - address
      * @param tag - see {@link Tag}
      * @returns integer of the number of transactions send from this address. */
    getTransactionCount: (address:string, tag:Tag) => Promise<Record<string,bigint>>
    
    /** Returns the number of transactions in a block from a block matching the given block hash.
      * @param hash - hash of a block
      * @returns integer of the number of transactions in this block. */
    getBlockTransactionCountByHash: (hash:string) => Promise<Record<string,bigint>>
    
    /** Returns the number of transactions in a block matching the given block number.
      * @param tag - see {@link Tag}
      * @returns integer of the number of transactions in this block. */
    getBlockTransactionCountByNumber: (tag:Tag) => Promise<Record<string,bigint>>
    
    /** Returns the number of uncles in a block from a block matching the given block hash.
      * @param hash - hash of a block
      * @returns integer of the number of uncles in this block. */
    getUncleCountByBlockHash: (hash:string) => Promise<Record<string,bigint>>
    
    /** Returns the number of uncles in a block from a block matching the given block number.
      * @param tag - see {@link Tag}
      * @returns integer of the number of uncles in this block. */
    getUncleCountByBlockNumber: (tag:Tag) => Promise<Record<string,bigint>>
    
    /** Returns code at a given address.
      * @param address - address
      * @param tag - see {@link Tag}
      * @returns the code from the given address. */
    getCode: (address:string, tag:Tag) => Promise<Record<string,string>>
    
    /** The sign method calculates an Ethereum specific signature with: sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))).
      *
      * By adding a prefix to the message makes the calculated signature recognizable as an Ethereum specific signature. This prevents misuse where a malicious dapp can sign arbitrary data (e.g. transaction) and use the signature to impersonate the victim.
      *
      * Note: the address to sign with must be unlocked.
      * @param address - address
      * @param data - message to sign
      * @returns Signature */
    sign: (address:string, data:string) => Promise<Record<string,string>>
    
    /** Signs a transaction that can be submitted to the network at a later time using with {@link sendRawTransaction}.
      * @param tx - see {@link TxSign}
      * @returns The RLP-encoded transaction object signed by the specified account. */
    signTransaction: (tx:TxSign) => Promise<Record<string,string>>
    
    /** Creates new message call transaction or a contract creation, if the data field contains code, and signs it using the account specified in from.
      * @param tx - see {@link TxSend}
      * @returns the transaction hash, or the zero hash if the transaction is not yet available. */
    sendTransaction: (tx:TxSend) => Promise<Record<string,string>>
    
    /** Creates new message call transaction or a contract creation for signed transactions.
      * @param data - The signed transaction data.
      * @returns the transaction hash, or the zero hash if the transaction is not yet available.
      * 
      * Use {@link getTransactionReceipt} to get the contract address, after the transaction was mined, when you created a contract. */
    sendRawTransaction: (data:string) => Promise<Record<string,string>>
    
    /** Executes a new message call immediately without creating a transaction on the block chain. Often used for executing read-only smart contract functions, for example the balanceOf for an ERC-20 contract.
      * @ param tx - see {@link TxCall}
      * @returns the return value of executed contract. */
    call: (tx:TxCall) => Promise<Record<string,string>>
    
    /** Generates and returns an estimate of how much gas is necessary to allow the transaction to complete. The transaction will not be added to the blockchain. Note that the estimate may be significantly more than the amount of gas actually used by the transaction, for a variety of reasons including EVM mechanics and node performance.
      * @param tx - see {@link TxEstimateGas}
      * @returns the amount of gas used. */
    estimateGas: (tx:TxEstimateGas) => Promise<Record<string,bigint>>
    
    /** Returns information about a block by hash.
      * @param hash - Hash of a block.
      * @param full - If true it returns the full transaction objects, if false only the hashes of the transactions.
      * @returns see {@link Block} */
    getBlockByHash: (hash:string) => Promise<Record<string,Block>>
    
    /** Returns information about a block by block number.
      * @param tag - see {@link Tag}
      * @param full - If true it returns the full transaction objects, if false only the hashes of the transactions.
      * @returns see {@link getBlockByHash} */
    getBlockByNumber: (tag:Tag, full:boolean) => Promise<Record<string,Block>>
    
    /** Returns the information about a transaction requested by transaction hash.
      * @param hash - hash of a transaction
      * @returns A transaction object (see {@link TxGetBy}), or null when no transaction was found: */
    getTransactionByHash: (hash:string) => Promise<Record<string,TxGetBy|null>>
    
    /** Returns information about a transaction by block hash and transaction index position.
      * @param hash - hash of a block.
      * @param index - integer of the transaction index position.
      * @returns see {@link getTransactionByHash} */
    getTransactionByBlockHashAndIndex: (hash:string, index:bigint) => Promise<Record<string,TxGetBy|null>>
    
    /** Returns information about a transaction by block number and transaction index position.
      * @param tag - see {@link Tag}
      * @param index - the transaction index position.
      * @returns see {@link getTransactionByHash} */
    getTransactionByBlockNumberAndIndex: (tag:Tag, index:bigint) => Promise<Record<string,TxGetBy|null>>
    
    /** Returns the receipt of a transaction by transaction hash.
      * @param hash - hash of a transaction
      * @returns see {@link TxReceipt} */
    getTransactionReceipt: (hash:string) => Promise<Record<string,TxReceipt|null>>
    
    /** Returns information about a uncle of a block by hash and uncle index position.
      * @param hash - The hash of a block
      * @param index - The uncle's index position.
      * @returns see {@link getBlockByHash} */
    getUncleByBlockHashAndIndex: (hash:string, index:bigint) => Promise<Record<string,Block>>
    
    /** Returns information about a uncle of a block by number and uncle index position.
      * @param tag - see {@link Tag}
      * @param index - the uncle's index position.
      * @returns see {@link getBlockByHash} */
    getUncleByBlockNumberAndIndex: (tag:Tag, index:bigint) => Promise<Record<string,Block>>
    
    /** Creates a filter object, based on filter options, to notify when the state changes (logs). To check if the state has changed, call {@link getFilterChanges}.
      *
      * A note on specifying topic filters: Topics are order-dependent. A transaction with a log with topics [A, B] will be matched by the following topic filters:
      * - [] "anything"
      * - [A] "A in first position (and anything after)"
      * - [null, B] "anything in first position AND B in second position (and anything after)"
      * - [A, B] "A in first position AND B in second position (and anything after)"
      * - [[A, B], [A, B]] "(A OR B) in first position AND (A OR B) in second position (and anything after)"
      *
      * @param filter - see {@link FilterNew}
      * @returns A filter id. */
    newFilter: (filter:FilterNew) => Promise<Record<string,bigint>>
    
    /** Creates a filter in the node, to notify when a new block arrives. To check if the state has changed, call {@link getFilterChanges}.
      * @returns A filter id. */
    newBlockFilter: () => Promise<Record<string,bigint>>
    
    /** Creates a filter in the node, to notify when new pending transactions arrive. To check if the state has changed, call {@link getFilterChanges}.
      * @returns A filter id. */
    newPendingTransactionFilter: () => Promise<Record<string,bigint>>
    
    /** Uninstalls a filter with given id. Should always be called when watch is no longer needed. Additionally Filters timeout when they aren't requested with {@link getFilterChanges} for a period of time.
      * @param id - The filter id.
      * @returns true if the filter was successfully uninstalled, otherwise false. */
    uninstallFilter: (id:bigint) => () => Promise<Record<string,boolean>>
    
    /** Polling method for a filter, which returns an array of logs which occurred since last poll.
      * @param id - the filter id.
      * @returns Array of {@link Log} objects, or an empty array if nothing has changed since last poll. */
    getFilterChanges: () => Promise<Record<string,string[]|Log[]>>
    
    /** Returns an array of all logs matching filter with given id.
      * @param id - The filter id.
      * @returns see {@link getFilterChanges} */
    getFilterLogs: (id:bigint) => Promise<Record<string,Log[]>>
    
    /** Returns an array of all logs matching a given filter object.
      * @param filter - The filter options. See {@link Filter}
      * @returns see {@link getFilterChanges} */
    getLogs: (filter:Filter) => Promise<Record<string,Log[]>>
    
}