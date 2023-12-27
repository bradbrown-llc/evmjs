import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import { Address, Data, Hash, Quantity } from './mod.ts'
export default z.object({
    blockHash: Hash.nullable(),
    blockNumber: Quantity.nullable(),
    from: Address,
    gas: Quantity,
    gasPrice: Quantity,
    hash: Hash,
    input: Data,
    nonce: Quantity,
    to: Address.nullable(),
    transactionIndex: Quantity.nullable(),
    value: Quantity,
    v: Quantity,
    r: Quantity,
    s: Quantity
})
