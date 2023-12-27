import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import { Address, Data, Hash, Quantity, Transaction } from './mod.ts' 
export default z.object({
    number: Quantity.nullable(),
    hash: Hash.nullable(),
    parentHash: Hash,
    nonce: Data.nullable(),
    sha3Uncles: Hash,
    logsBloom: Data.nullable(),
    transactionsRoot: Hash,
    stateRoot: Hash,
    receiptsRoot: Hash,
    miner: Address,
    difficulty: Quantity,
    totalDifficulty: Quantity.optional(),
    extraData: Data,
    size: Quantity,
    gasLimit: Quantity,
    gasUsed: Quantity,
    timestamp: Quantity,
    transactions: Transaction.or(Hash).array(),
    uncles: Hash.array()
})