import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import ejrac from './lib/ejrac.ts'
type Opt = { url:string, data:string }
export default (o:Opt) => ejrac(Object.assign(o, {
    method: 'web3_sha3',
    params: [o.data],
    schema: z.string()
}))