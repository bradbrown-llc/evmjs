export default class AIQ<T> implements AsyncIterator<T>{

    promise!: Promise<unknown>
    push!: (x: T|symbol) => void
    queue: Array<T|symbol>
    terminator: symbol

    constructor() {
        this.#resetPromise()
        this.queue = []
        this.terminator = Symbol()
    }
    
    async next():Promise<IteratorResult<T>> {
        if (!this.queue.length) { await this.promise; this.#resetPromise() }
        const value = this.queue.shift() as T|symbol
        if (typeof value == 'symbol') {
            if (value === this.terminator) return { done: true, value: null }
            else throw 'invalid terminator symbol'
        }
        return { value }
    }
    
    [Symbol.asyncIterator]() { return this }
    
    #resetPromise() { this.promise = new Promise(r => this.push = (x: T|symbol) => { this.queue.push(x); r(null) }) }
    
}