import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import { a, h, q } from '../prim/index.ts'
export default z.object({
    removed: z.boolean(),
    logIndex: q.nullable(),
    transactionIndex: q.nullable(),
    transactionHash: h.nullable(),
    blockHash: h.nullable(),
    blockNumber: q.nullable(),
    address: a,
    data: h.array(),
    topics: h.array()
})