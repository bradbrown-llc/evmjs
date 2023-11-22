type JsonRpcBase = { jsonrpc:'2.0', id:string|number|null }
type JsonRpcReq = JsonRpcBase&{ method:string, params:Array<unknown> }
type JsonRpcReqs = Array<JsonRpcReq>
type JsonRpcRes = JsonRpcBase&{ result:unknown }
type JsonRpcErr = JsonRpcBase&{ error: { code:number, message:string, data?:unknown } }