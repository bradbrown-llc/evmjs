export default class AIQ<T> implements AsyncIterator<T>{

    promise!: Promise<unknown>
    push!: (x: T|symbol) => void
    queue: Array<T|symbol>
    terminator: symbol

    constructor() {
        console.log('AIQ: constructing')
        this.#resetPromise()
        this.queue = []
        this.terminator = Symbol()
    }
    
    async next():Promise<IteratorResult<T>> {
        console.log('AIQ: next called, checking queue')
        if (!this.queue.length) { await this.promise; this.#resetPromise() }
        console.log('AIQ: items in queue or push called')
        const value = this.queue.shift() as T|symbol
        console.log('AIQ: value shifted from queue')
        if (typeof value == 'symbol') {
            console.log('AIQ: terminator found')
            if (value === this.terminator) return { done: true, value: null }
            else throw 'invalid terminator symbol'
        }
        console.log('AIQ: returning value')
        return { value }
    }
    
    [Symbol.asyncIterator]() { return this }
    
    #resetPromise() { this.promise = new Promise(r => this.push = (x: T|symbol) => { this.queue.push(x); r(null) }) }
    
}