import { BlockResponse } from './lib/z/cplx/index.ts'
import ejrac from './lib/ejrac.ts'
type Opt = { url:string, tag?:Tag, full?:boolean }
export default (o:Opt) => ejrac(Object.assign(o, {
    method: 'eth_getBlockByNumber',
    params: [o.tag ?? 'latest', o.full ?? true],
    schema: BlockResponse
}))