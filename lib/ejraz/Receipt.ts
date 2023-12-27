import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import { Address, Data, Hash, Log, Quantity } from './mod.ts'
export default z.object({
    transactionHash: Hash,
    transactionIndex: Quantity,
    blockHash: Hash,
    blockNumber: Quantity,
    from: Address,
    to: Address.nullable(),
    cumulativeGasUsed: Quantity,
    effectiveGasPrice: Quantity,
    gasUsed: Quantity,
    contractAddress: Address.nullable(),
    logs: Log.array(),
    logsBloom: Data,
    type: Quantity,
    status: z.number()
})