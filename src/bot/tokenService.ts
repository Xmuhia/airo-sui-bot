import { JsonRpcProvider, Ed25519Keypair, RawSigner } from '@mysten/sui.js';
import dotenv from 'dotenv';
import { logInfo, logError } from '../utils/logger';

dotenv.config();

const provider = new JsonRpcProvider('https://fullnode.devnet.sui.io/');
const privateKey = process.env.SUI_PRIVATE_KEY || '';
const keypair = Ed25519Keypair.fromSecretKey(Buffer.from(privateKey, 'hex'));
const signer = new RawSigner(keypair, provider);

export async function exchangeSuiForAiro(suiAmount: number, recipient: string) {
  try {
    const airoAmount = (suiAmount / 0.02).toFixed(2); // Conversion logic
    logInfo(`Exchanging ${suiAmount} SUI for ${airoAmount} AIRO tokens...`);

    const tx = await signer.transferSui({
      recipient,
      amount: parseInt(airoAmount, 10),
    });

    logInfo('Transaction successful:', tx);
  } catch (error) {
    logError('Failed to exchange tokens:', error);
  }
}
