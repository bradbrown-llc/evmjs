type HermesRpcReq = {
    method:string
    params?:EjraParams
    dry?:boolean
    signal?:AbortSignal
    id?:string|number|null
}

type HermesRpcResDry = {
    url:string
    method:string
    params:EjraParams
    id:string|number|null
}