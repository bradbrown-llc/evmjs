import { ejraz } from '../mod.ts'
import { ejracall, Tag } from './lib/mod.ts'
const { Block } = ejraz
type Opt = { url:string, tag?:Tag, full?:boolean }
export default (o:Opt) => ejracall(Object.assign(o, {
    method: 'eth_getBlockByNumber',
    params: [o.tag ?? 'latest', o.full ?? true],
    schema: Block
}))