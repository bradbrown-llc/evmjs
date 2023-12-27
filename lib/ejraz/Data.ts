import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
export default z.string().regex(/^0x([0-9a-f]{2})*$/i)