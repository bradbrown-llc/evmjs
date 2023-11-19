// see whyNotX and isX pattern from lib/chain.ts

function whyNotEJRARes(x:unknown) {
    if (!(typeof x == 'object') || x === null) return 'not real object'
    if (!('jsonrpc' in x && x.jsonrpc == '2.0')) return 'jsonrpc missing or invalid'
    if (!('result' in x)) return 'result missing'
    if (!('id' in x && typeof x.id == 'number')) return 'id missing or invalid'
}

function whyNotEJRAErr(x:unknown) {
    if (!(typeof x == 'object') || x === null) return 'not real object'
    if (!('jsonrpc' in x && x.jsonrpc == '2.0')) return 'jsonrpc missing or invalid'
    if (!('error' in x && typeof x.error == 'object' && x.error !== null)) return 'error missing'
    if (!('id' in x && typeof x.id == 'number')) return 'id missing or invalid'
}

function isEJRARes(x:unknown): x is EJRARes { return !whyNotEJRARes(x) }

function isEJRAErr(x:unknown): x is EJRAErr { return !whyNotEJRAErr(x) }

export { isEJRARes, isEJRAErr }