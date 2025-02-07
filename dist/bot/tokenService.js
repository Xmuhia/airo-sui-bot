import { SuiClient } from '@mysten/sui.js/client';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import * as bip39 from 'bip39';
import dotenv from 'dotenv';
import { logInfo, logError } from '../utils/logger';
dotenv.config();
const seedPhrase = process.env.SUI_MNEMONIC || '';
const seedBuffer = await bip39.mnemonicToSeed(seedPhrase);
const keypair = Ed25519Keypair.fromSecretKey(seedBuffer.slice(0, 32));
export async function exchangeSuiForAiro(suiAmount, recipient) {
    try {
        const airoAmount = (suiAmount / 0.02).toFixed(2);
        logInfo(`Exchanging ${suiAmount} SUI for ${airoAmount} AIRO tokens...`);
        const suiClient = new SuiClient({
            url: 'https://fullnode.devnet.sui.io:443',
        });
        // Create a transaction block
        const tx = new TransactionBlock();
        // Create a coin and transfer it
        const [coin] = tx.splitCoins(tx.gas, [tx.pure.u64(parseInt(airoAmount, 10))]);
        tx.transferObjects([coin], tx.pure.address(recipient));
        const result = await suiClient.signAndExecuteTransactionBlock({
            transactionBlock: tx,
            signer: keypair,
        });
        logInfo('Transaction successful:', result);
        return result;
    }
    catch (error) {
        logError('Failed to exchange tokens:', error);
        throw error;
    }
}
