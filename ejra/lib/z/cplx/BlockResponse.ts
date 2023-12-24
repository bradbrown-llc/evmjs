import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import { a, d, h, q } from '../prim/index.ts'
import { TxR } from './index.ts'
export default z.object({
    number: q.nullable(),
    hash: h.nullable(),
    parentHash: h,
    nonce: d.nullable(),
    sha3Uncles: h,
    logsBloom: d.nullable(),
    transactionsRoot: h,
    stateRoot: h,
    receiptsRoot: h,
    miner: a,
    difficulty: q,
    totalDifficulty: q.optional(),
    extraData: d,
    size: q,
    gasLimit: q,
    gasUsed: q,
    timestamp: q,
    transactions: TxR.or(h).array(),
    uncles: h.array()
})