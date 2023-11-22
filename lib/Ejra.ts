// see whyNotX and isX pattern from lib/chain.ts

function isEjraRes(x:unknown): x is EjraRes {
    return typeof x === 'object' && x !== null
        && 'jsonrpc' in x && x.jsonrpc === '2.0'
        && 'id' in x
            && (typeof x.id == 'string'
                || typeof x.id == 'number'
                || x.id === null)
        && (('result' in x && !('error' in x))
            || ('error' in x && !('result' in x)
                && typeof x.error == 'object' && x.error !== null
                && 'code' in x.error && typeof x.error.code == 'number'
                && 'message' in x.error && typeof x.error.message == 'string'))}

export { isEjraRes }