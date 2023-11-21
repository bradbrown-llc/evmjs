import rethrow from './rethrow.ts'
import { getInit, getBody } from './Hermes.ts'
import { isEjraRes } from './EJRA.ts'

export default class Hermes {

    static async call(url:string, opts:HermesOpts) {
        if (opts.dry === true) return getBody(opts)
        const repsonse = await fetch(url, getInit(opts)).catch(rethrow)
        const json = await repsonse.json().catch(rethrow)
        if (!isEjraRes(json)) throw new Error('response shape not EjraRes')
        return json
    }

}