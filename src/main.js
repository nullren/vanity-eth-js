const bip39 = require('bip39')
const { ethers } = require("ethers")

const args = require('yargs/yargs')(process.argv.slice(2))
  .options({
    'prefix': {
      alias: 'p',
      describe: 'search for wallet matching prefix',
      //demandOption: true
    },
  })
  .help()
  .argv

function randomWallet() {
  const mnemonic = bip39.generateMnemonic()
  const node = ethers.utils.HDNode.fromMnemonic(mnemonic)
  const standardEthereum = node.derivePath("m/44'/60'/0'/0/0");
  const key = standardEthereum.privateKey
  const address = standardEthereum.address

  return {mnemonic, key, address}
}

function* randomWallets() {
  while (true) {
    yield randomWallet();
  }
}

function any() {
  return (wallet) => {
    return true;
  }
}

function withPrefix(prefix) {
  return (wallet) => {
    if (String(wallet.address).startsWith(`0x${prefix}`)) {
      return true;
    }
    return false;
  }
}

function generateWallet(selector) {
  let tries = 0
  for (let wallet of randomWallets()) {
    tries++
    if (tries % 100 == 99) {
      process.stdout.write('.')
    }
    if (selector(wallet)) {
      if (tries >= 99) {
        process.stdout.write('\n')
      }
      if (tries > 1) {
        console.log("finished tries:", tries)
      }
      return wallet;
    }
  }
}

const {mnemonic, key, address} = generateWallet(args.prefix ? withPrefix(args.prefix) : any())
console.log("mnemonic:", mnemonic)
console.log("private key:", key)
console.log("public key:", address)
