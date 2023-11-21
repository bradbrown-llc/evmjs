import { isEJRARes, isEJRAErr } from './EJRA.ts'
import AIQ from './AIQ.ts'

function replacer(_:string, v:unknown) { return typeof v == 'bigint' ? `0x${v.toString(16)}` : v }

export default class Hermes {

    static call(rpc:string|string[], { method, params, dry }:{ method:string, params?:unknown[], dry?:boolean }) {
        const ejraReq = { id: 1, jsonrpc: '2.0' }
        if (params === undefined) params = []
        const body = JSON.stringify(Object.assign(ejraReq, { method, params }), replacer)
        if (dry) return [rpc].flat().reduce((record:Record<string,string>, url) => (record[url] = body, record), {})
        // create an Asynchronous Iterable Queue
        const aiq:AIQ<{ url:string, res:Error, status:|'rejected' }|{ url:string, res:unknown, status:'fulfilled' }> = new AIQ()
        // coerce rpc to an array of addresses, then for each
        ;(async () => {
            console.log('Hermes: waiting for all requests to settle')
            await Promise.allSettled([rpc].flat().map(async url => {
                console.log('Hermes: fetching response')
                const response = await fetch(url, {
                    method: 'POST',
                    body,
                    headers: { 'Content-Type': 'application/json' },
                    signal: AbortSignal.timeout(30000)
                })
                let json; const text = await response.text()
                try { json = JSON.parse(text) } catch (_) { aiq.push({ url, res: Error(`not valid JSON: ${text.slice(0, 10)}`), status: 'rejected' }) }
                if (isEJRARes(json)) aiq.push({ url, res: json.result, status: 'fulfilled' })
                else if (isEJRAErr(json)) aiq.push({ url, res: new Error(JSON.stringify(json.error)), status: 'rejected' })
                else aiq.push({ url, res: new Error(`response not valid: ${JSON.stringify(text.slice(0, 10))}`), status: 'rejected' })
            }))
            aiq.push(aiq.terminator)
        })()
        return aiq
    }

}