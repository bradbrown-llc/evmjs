import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
export default z.object({
    rpc: z.string().array().nonempty(),
    chainId: z.number().transform(x => BigInt(x)),
    name: z.string(),
    infoURL: z.string()
})