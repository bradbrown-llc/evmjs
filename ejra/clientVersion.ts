import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import ejrac from './lib/ejrac.ts'
type Opt = { url:string }
export default (o:Opt) => ejrac(Object.assign(o, {
    method: 'web3_clientVersion',
    params: [],
    schema: z.string()
}))