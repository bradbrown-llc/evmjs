type BigIntable = string|number|bigint|boolean
type Guard = (x:unknown) => boolean
/** A JsonRpcReq object. See {@link https://www.jsonrpc.org/specification#request_object |JSON-RPC 2.0 Specification - Request object} */
type JsonRpcBase = { jsonrpc:'2.0', id:number }
type JsonRpcReq = JsonRpcBase&{ method:string, params:Array<unknown> }
type JsonRpcRes = JsonRpcBase&{ result:unknown }
/** An interaction - a container representing the total lifecycle of an EVM JSON RPC call.
 *  @param req - See {@link JsonRpcReq}
 *  @param guard - A function to verify the response is valid. Of type ```(x:unknown)=>boolean```
 *  @param res - The result field of a JSON-RPC 2.0 Specification Response object
 *  @param err - An error field describing why the result field of a sent interaction could not be populated.
 *  @param pickled - An interaction that can't ever be sent. This happens if we queue many interactions then exit batching mode before sending.
 *  @param sent - An interaction that has been sent. It won't be sent again. */
type Ix = {
    req:JsonRpcReq,
    guard:Guard,
    res?:unknown,
    err?:Error,
    pickled?:true,
    sent?:true
}
type Ixs = Array<Ix>