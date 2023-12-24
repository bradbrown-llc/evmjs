import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import { a, d, h, q } from '../prim/index.ts'
export default z.object({
    blockHash: h.nullable(),
    blockNumber: q.nullable(),
    from: a,
    gas: q,
    gasPrice: q,
    hash: h,
    input: d,
    nonce: q,
    to: a.nullable(),
    transactionIndex: q.nullable(),
    value: q,
    v: q,
    r: q,
    s: q
})
