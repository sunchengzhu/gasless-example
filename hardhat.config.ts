import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import {HardhatUserConfig} from 'hardhat/types'

//0x3499932d7a1D1850253d6c66d830e3524bb3F2a7
const PRIVATE_KEY = 'f97f603bd6214915d76bbe03d9bc3ba56d1574d135c96c18e5a7572e5b9aa38f'
const config: HardhatUserConfig = {
    defaultNetwork: 'gw_testnet_v1',
    networks: {
        gw_testnet_v1: {
            url: 'https://v1.testnet.godwoken.io/rpc/instant-finality-hack',
            accounts: [`0x${PRIVATE_KEY}`]
        }
    },
    solidity: {
        compilers: [{version: '0.8.15', settings: {}}],
    }
}

export default config
