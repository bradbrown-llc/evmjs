import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import { ejracall } from './lib/mod.ts'
type Opt = { url:string }
export default (o:Opt) => ejracall(Object.assign(o, {
    method: 'web3_clientVersion',
    params: [],
    schema: z.string()
}))