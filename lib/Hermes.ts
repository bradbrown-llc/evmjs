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
        let json; const text = await response.text()
        try { json = JSON.parse(text) } catch (_) { throw `not valid JSON: ${text}` }
        if (isEJRARes(json)) return json.result
        if (isEJRAErr(json)) throw json.error
        throw `response not valid: ${JSON.stringify(json)}`
    }

}