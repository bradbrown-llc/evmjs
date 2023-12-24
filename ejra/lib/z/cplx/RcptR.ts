import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import { a, d, h, q } from '../prim/index.ts'
import { LogR } from './index.ts'
export default z.object({
    transactionHash: h,
    transactionIndex: q,
    blockHash: h,
    blockNumber: q,
    from: a,
    to: a.nullable(),
    cumulativeGasUsed: q,
    effectiveGasPrice: q,
    gasUsed: q,
    contractAddress: a.nullable(),
    logs: LogR.array(),
    logsBloom: d,
    type: q,
    status: z.number()
})