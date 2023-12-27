import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import { ejraz } from './mod.ts'
const { Chain } = ejraz
const evmjs = Deno.env.get('EVMJS')
if (!evmjs) throw new Error('evmjs env dir not set (EVMJS)')
const chainsDir = `${evmjs}/ethereum-lists/_data/chains`
const chains: z.infer<typeof Chain>[] = []
for (const entry of Deno.readDirSync(chainsDir)) {
    const fp = `${chainsDir}/${entry.name}`
    const bytes = Deno.readFileSync(fp)
    const decoder = new TextDecoder()
    const text = decoder.decode(bytes)
    const json = JSON.parse(text)
    // take out all websocket urls 
    json.rpc = json.rpc.filter((url:string) => !url.match(/\bws\b|^ws/))
    if (!json.rpc.length) continue
    const chain = Chain.parse(json)
    chains.push(chain)
}
export default chains