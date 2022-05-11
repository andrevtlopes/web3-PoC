import { Interface } from '@ethersproject/abi'
import { useContractCall, useContractFunction } from '@usedapp/core';
import { Contract } from '@ethersproject/contracts';
import { ethers, utils } from 'ethers';
import Prisma from '../../../artifacts/contracts/Prisma.sol/Prisma.json';
import BigchainDB from 'bigchaindb-driver';
import bip39 from 'bip39';
import BuyToken from '../../../artifacts/contracts/BuyToken.sol/BuyToken.json';

const prismaAddress = '0x2E7324E5ab995e9243d3C91c166470AB19E961Da';
const prismaInterface = new ethers.utils.Interface(Prisma.abi);
const contract = new Contract(prismaAddress, prismaInterface);

export function useContractMethod(methodName: string) {
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // contract.connect(signer);

    const { state, send } = useContractFunction(contract, methodName, {});
    return { state, send };
}

export function useWhitelistTokenContractFunction(
    functionName: string,
    signer: any,
    transactionName?: string
) {
    const tokenInterface = new utils.Interface(BuyToken.abi);
    const contract = new Contract(
        process.env.NEXT_PUBLIC_BUY_TOKEN_WHITELIST_CONTRACT,
        tokenInterface,
        signer
    );

    return useContractFunction(contract, functionName, { transactionName });
}

export function useWhitelistTokenContractMethod(methodName: string, args=[]): any | undefined {
    const tokenInterface = new utils.Interface(BuyToken.abi);
    const contract = new Contract(
        process.env.NEXT_PUBLIC_BUY_TOKEN_WHITELIST_CONTRACT,
        tokenInterface,
    );
    const value = useContractCall({
      abi: tokenInterface,
      address: process.env.NEXT_PUBLIC_BUY_TOKEN_WHITELIST_CONTRACT,
      method: methodName,
      args
    }) ?? {}
    // if (error) {
    //   console.error(error.message)
    //   return undefined
    // }
    return value?.[0]
}
  
export function useDBConnection() {
    return new BigchainDB.Connection(process.env.API_PATH);
}

export function useCreateUser(keySeed: string) {
    if (typeof keySeed == undefined || keySeed == '') return new BigchainDB.Ed25519Keypair();
    return new BigchainDB.Ed25519Keypair(bip39.mnemonicToSeedSync(keySeed).slice(0, 32));
}

enum PrismaType {
    Fofinho,
    AlgoOK,
    SeiLa,
    OutroAi,
}

function weightedRandom(prob) {
    let i, sum=0, r=Math.random();
    for (i in prob) {
      sum += prob[i];
      if (r <= sum) return i;
    }
  }

const calculateType = () => {
    const weight = {
        0: 0.65,
        1: 0.2,
        2: 0.1,
        3: 0.05,
    };
    return weightedRandom(weight);
}

export function useSoftMintPrisma(user) {
    const conn = useDBConnection();
        // Construct a transaction payload
        const txCreatePrisma = BigchainDB.Transaction.makeCreateTransaction(
        // Asset field
        {
            type: calculateType(),
            
            
        },
        // Metadata field, contains information about the transaction itself
        // (can be `null` if not needed)
        {
            datetime: new Date().toString(),
            location: 'Madrid',
            value: {
                value_eur: '25000000€',
                value_btc: '2200',
            }
        },
        // Output. For this case we create a simple Ed25519 condition
        [BigchainDB.Transaction.makeOutput(
            BigchainDB.Transaction.makeEd25519Condition(user.publicKey))],
        // Issuers
        user.publicKey
    )
    // The owner of the painting signs the transaction
    const txSigned = BigchainDB.Transaction.signTransaction(txCreatePrisma,
        user.privateKey)

    // Send the transaction off to BigchainDB
    conn.postTransactionCommit(txSigned)
        .then(res => {
            document.body.innerHTML += '<h3>Transaction created</h3>';
            document.body.innerHTML += txSigned.id
            // txSigned.id corresponds to the asset id of the painting
            })
}