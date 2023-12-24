import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
export default z
    .string()
    .regex(/^0x(0|[1-9a-f][0-9a-f]{0,63})$/i)
    .transform((val, _ctx) => BigInt(val))