# vanity-eth-js

This is just a really quick project that generates an ethereum wallet with backup passphrase that can be imported into different wallets like Metamask and Rainbow.

# Why would I want this?

You probably don't and it puts you in unnecessary risk of exposing your private keys. This will only help you generated an ethereum address that matches some criteria, eg., addresses that start with `0xdead`. It's a silly vanity thing.

However, what's slightly different about this generator from others is that others only give you a private key for the address generated. This also gives you the backup passphrase which can be used for HD (brain) wallets. And why would you want that? I don't know but it makes adding the wallet to Metamask or Rainbow pretty easy.

# Usage

It's pretty barebones and not user friendly. Edit the source file `src/main.js` and set the prefix or any other criteria you want. It can take upwards of 10 minutes or so to match a prefix like `0xdead`. Run with `yarn start`. Could this be faster? Absolutely, but I only needed to do this once and the prefix I wanted was small enough.

# Contributions

Any contributions are welcome in the form of a PR. Issues are likely to be ignored for this as it's such a small project and it has served its purpose for me. However, I am happy to make small changes if requested nicely 😀
