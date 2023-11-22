import rethrow from './rethrow.ts'

const whyNotJsonRpcBase = (x:unknown) => {
    if (!(typeof x == 'object' && x !== null)) return 'not object x'
    if (!('jsonrpc' in x  && x.jsonrpc == '2.0')) return 'missing or invalid jsonrpc'
    if (!('id' in x && (typeof x == 'string' || typeof x.id == 'number' || x.id === null))) return 'missing or invalid id'
}
const isJsonRpcBase = (x:unknown): x is JsonRpcBase => !whyNotJsonRpcBase(x)

const whyNotJsonRpcRes = (x:JsonRpcBase) => {
    if (!isJsonRpcBase(x)) return whyNotJsonRpcBase(x)
    if (!('result' in x)) return 'missing result'
}
const isJsonRpcRes = (x:JsonRpcBase): x is JsonRpcRes => !whyNotJsonRpcRes(x)

const whyNotJsonRpcErr = (x:JsonRpcBase) => {
    if (!isJsonRpcBase(x)) return whyNotJsonRpcBase(x)
    if (!('error' in x)) return 'missing error'
    if (!(typeof x.error == 'object' && x.error !== null)) return 'not object error'
    if (!('code' in x.error && typeof x.error.code == 'number')) return 'missing or invalid code'
    if (!('message' in x.error && typeof x.error.message == 'string')) return 'missing or invalid message'
}
const isJsonRpcErr = (x:JsonRpcBase): x is JsonRpcErr => !whyNotJsonRpcErr(x)

const replacer = (_:string, v:unknown) => typeof v == 'bigint' ? ''+v : v

class JsonRpc {
    
    static async request(url:string, req:JsonRpcReq|JsonRpcReqs) {
        // create fetch init
        const init = {
            body: JSON.stringify(req, replacer),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            signal: AbortSignal.timeout(30000)
        }
        // get response
        const response = await fetch(url, init).catch(rethrow)
        // convert to json
        const json = await response.json().catch(rethrow)
        // return result, or handle if result isn't a valid json rpc result
        if (isJsonRpcRes(json)) return json.result
        else if (isJsonRpcErr(json)) throw new Error(JSON.stringify(json.error))
        else {
            let cause:string
            if (!isJsonRpcBase(json)) cause = `isBase? ${whyNotJsonRpcBase(json)}`
            else cause = `isRes? ${whyNotJsonRpcRes(json)} | isErr? ${whyNotJsonRpcErr(json)}`
            cause += `: ${JSON.stringify(json)}`
            throw new Error(`invalid json rpc response`, { cause })
        }
    }
    
}

export default JsonRpc