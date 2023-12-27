import { getPublicKey, signAsync } from 'npm:@noble/secp256k1@2.0.0'
import jsSha3 from 'npm:js-sha3@0.9.2'
export default class Signer {
    secret:string
    constructor(secret:string) { this.secret = secret }
    get address() {
        const p = getPublicKey(this.secret, false).slice(1)
        return `0x${jsSha3.keccak256(p).slice(-40)}`
    }
    sign(unsignedTxHash:string) { return signAsync(unsignedTxHash, this.secret) }
}