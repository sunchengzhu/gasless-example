# godwoken gasless example

A simple example selected from [the unit test project](https://github.com/godwokenrises/account-abstraction/blob/gw-gasless/test/gasless_paymaster.test.ts).  
The paymaster contract has executed `addStake`,`addWhitelistAddress`,and `addAvailAddr`,the entrypiont contract has executed `depositTo`,see [the document](https://docs.godwoken.io/gasless-feature) for details.

## usage
Install dependencies
```bash
yarn install
```

Compile contracts and generate typechain code
```bash
yarn hardhat compile
```

Run
```bash
yarn hardhat test
```

## contract address

[GaslessEntryPoint](https://v1.testnet.gwscan.com/account/0x791ec459f57362256f313f5512bdb9f6d7cae308)  
[GaslessDemoPaymaster](https://v1.testnet.gwscan.com/account/0xf6771069e7e7bf2bf5e4fce6db7bbbbf6ced67e9?tab=contract)  
[GaslessDemoPaymaster owner](https://v1.testnet.gwscan.com/account/0x7752DCD7c6ce4aED048c028021D635CBEc6C001D)  
[whitelistUser](https://v1.testnet.gwscan.com/account/0x3499932d7a1D1850253d6c66d830e3524bb3F2a7)  
[SimpleStorage](https://v1.testnet.gwscan.com/account/0x93a6e598eb7608edd037d6701e76f69ce97c30bf?tab=contract)
