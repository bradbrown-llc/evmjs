import JsonRpc from './JsonRpc.ts'

export default class Hermes {

    static request(url:string, req:JsonRpcReq|JsonRpcReqs) {
        return JsonRpc.request(url, req)
    }

}