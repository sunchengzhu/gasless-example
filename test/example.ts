import {UserOperationStruct} from '../typechain-types/core/GaslessEntryPoint'
import {ethers} from 'hardhat'
import {SimpleStorage} from '../typechain-types'
import {hexConcat} from 'ethers/lib/utils'
import {expect} from "chai";


describe('#example', function () {
    const ENTRYPOINT_CONTRACT_ADDRESS = '0x791ec459f57362256f313F5512bDB9F6d7Cae308'
    const PAYMASTER_CONTRACT_ADDRESS = '0xf6771069e7e7bf2bf5e4fce6db7bbbbf6ced67e9'
    const SIMPLESTORAGE_CONTRACT_ADDRESS = '0x93a6e598eb7608edd037d6701e76f69ce97c30bf'
    const randomNum = Math.floor(Math.random() * 100000000)
    let simpleStorage: SimpleStorage
    let simpleStorageCallData: string
    before(async function () {
        const SimpleStorage = await ethers.getContractFactory('SimpleStorage')
        simpleStorage = await SimpleStorage.attach(SIMPLESTORAGE_CONTRACT_ADDRESS)
        const testTx = await simpleStorage.populateTransaction.setValue(randomNum)
        simpleStorageCallData = testTx.data ?? ''
    })
    it('simpleExample', async () => {
        // define UserOp
        const userOp: UserOperationStruct = {
            callContract: simpleStorage.address,
            callData: simpleStorageCallData,
            callGasLimit: 100000,
            verificationGasLimit: 100000,
            maxFeePerGas: 1,
            maxPriorityFeePerGas: 1,
            paymasterAndData: hexConcat([PAYMASTER_CONTRACT_ADDRESS, '0x1234'])
        }

        // 1. construct and send gasless transaction via native sendTransaction
        const abiCoder = new ethers.utils.AbiCoder();
        let payload = abiCoder.encode(["tuple(address callContract, bytes callData, uint256 callGasLimit, uint256 verificationGasLimit, uint256 maxFeePerGas, uint256 maxPriorityFeePerGas, bytes paymasterAndData) UserOperation"], [userOp]);
        // first 4 bytes of keccak hash of handleOp((address,bytes,uint256,uint256,uint256,uint256,bytes))
        const fnSelector = "fb4350d8";
        // gasless payload = ENTRYPOINT_HANDLE_OP_SELECTOR + abiEncode(UserOperation)
        payload = "0x" + fnSelector + payload.slice(2);
        const signers = await ethers.getSigners()
        const whitelistUser = signers[0]
        const gaslessTx = {
            from: whitelistUser.address,
            to: ENTRYPOINT_CONTRACT_ADDRESS,
            data: payload,
            gasPrice: 0,
            gasLimit: 400000,
            value: 0,
        }
        const tx = await whitelistUser.sendTransaction(gaslessTx);
        const receipt = await tx.wait();
        console.log(`tx: https://v1.testnet.gwscan.com/tx/${receipt.transactionHash}`)
        //check state changed
        const value = await simpleStorage.getValue()
        expect(value).to.be.equal(randomNum)
    })
})
