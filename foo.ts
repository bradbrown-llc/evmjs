import * as ejra from './ejra/index.ts'
const { err, res } = await ejra.blockByNumber({ url: 'https://rpc3.fantom.network' })
if (err) throw err
res.number