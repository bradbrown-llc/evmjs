type HermesReq = {
    id?:number|null
    method:string
    params?:EjraParams
    dry?:boolean
    signal?:AbortSignal
}