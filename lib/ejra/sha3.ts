import { Hash } from '../ejraz/mod.ts'
import { ejracall } from './lib/mod.ts'
type Opt = { url:string, data:string }
export default (o:Opt) => ejracall(Object.assign(o, {
    method: 'web3_sha3',
    params: [o.data],
    schema: Hash
}))