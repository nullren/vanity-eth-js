
const bip39 = require('bip39')
const { ethers } = require("ethers")

let done = false
let mnemonic, key, address
let tries = 0

while (!done) {
    tries++
    mnemonic = bip39.generateMnemonic()
    const node = ethers.utils.HDNode.fromMnemonic(mnemonic)
    const standardEthereum = node.derivePath("m/44'/60'/0'/0/0");
    key = standardEthereum.privateKey
    address = standardEthereum.address

    // console.log("public key:", address)
    if (tries % 100 == 99) {
        process.stdout.write('.')
    }

    if (/^0xdead/i.test(address)) {
        process.stdout.write('\n')
        done = true
    }
}

console.log("tries:", tries)
console.log("mnemonic:", mnemonic)
console.log("private key:", key)
console.log("public key:", address)