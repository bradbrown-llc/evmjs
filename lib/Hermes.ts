// function replacer(_:string, v:unknown) { return typeof v == 'bigint' ? ''+v : v }

// function getBody(opts:HermesOpts):EjraReq {
//     return {
//         id: opts.id ?? null,
//         method: opts.method,
//         params: opts.params ?? [],
//         jsonrpc: '2.0'
//     }
// }

// function getInit(opts:HermesOpts):RequestInit {
//     return {
//         method: 'POST',
//         body: JSON.stringify(getBody(opts), replacer),
//         headers: { 'Content-Type': 'application/json' },
//         signal: opts.signal ?? AbortSignal.timeout(30000)
//     }
// }

// export { getBody, getInit }