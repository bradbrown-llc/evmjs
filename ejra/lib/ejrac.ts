import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

z.setErrorMap((_val, ctx) => {
    const { data } = ctx
    return { message: JSON.stringify({ data }) }
})

const JsonRpcBaseResponse = z.object({
    jsonrpc: z.literal('2.0'),
    id: z.number().nullable()
})
const JsonRpcErrorObject = z.object({
    code: z.number(),
    message: z.string(),
    data: z.unknown().optional()
})
const JsonRpcErrorResponse = JsonRpcBaseResponse.extend(
    z.object({ error: JsonRpcErrorObject }).shape
)

// export default <P extends unknown[],S extends z.ZodTypeAny>(url:string, schema:S, method:string, ...params:P) => {
export default <P,S extends z.ZodTypeAny>(o:{ 
    url:string,
    method:string,
    params:P[],
    schema:S
}) => {
    const { url, method, params, schema } = o
    const JsonRpcResultResponse = JsonRpcBaseResponse.extend(
        z.object({ result: schema }).shape
    )
    const JsonRpcResponse = JsonRpcErrorResponse.or(JsonRpcResultResponse)
    const jsonrpc = '2.0'
    const id  = null
    const replacer = (_k:string, v:unknown) => typeof v == 'bigint' ? `0x${v.toString(16)}` : v
    const body = JSON.stringify({ jsonrpc, method, params, id }, replacer)
    const headers = { 'Content-Type': 'application/json' }
    const signal = AbortSignal.timeout(5000)
    const init = { body, headers, method: 'POST', signal }
    return new Promise<{ err:undefined, res:z.infer<S> }|{ err:Error, res:undefined }>(resolve => {
        fetch(url, init)
        .then(response => response.json())
        .then(json => {
            JsonRpcResponse.parse(json)
            const jr = json as z.infer<typeof JsonRpcResponse>
            if ('error' in jr) throw new Error(`${jr.error.code}: ${jr.error.message}`, { cause: jr })
            resolve({ err: undefined, res: schema.parse(jr.result) })
        })
        .catch(reason => {
            if (reason instanceof Error)
                if (reason instanceof z.ZodError) resolve({ err: reason, res: undefined })
                else resolve({ err: reason, res: undefined })
            else resolve({ err: new Error('UnknownError', { cause: reason }), res: undefined })
        })
    })
}