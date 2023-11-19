import { isEJRARes, isEJRAErr } from './EJRA.ts'

export default class Hermes {

    static async get(
        rpc:string,
        { method, params }:{ method:string, params?:unknown[]}
    ) {
        const request = { id: 1, jsonrpc: '2.0' }
        params = []
        const body = JSON.stringify(Object.assign(request, { method, params }))
        const response = await fetch(rpc, { method: 'POST', body })
        const json = await response.json() as unknown
        if (isEJRARes(json)) return json.result
        if (isEJRAErr(json)) throw json.error
        throw 'response not valid'
    }

}