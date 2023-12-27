import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import { ejraz, Signer } from './mod.ts'

export type Session = {
    chain:z.infer<typeof ejraz.Chain>,
    signer:Signer
}