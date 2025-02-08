import { SuiClient } from '@mysten/sui.js/client';
import { logError } from './logger.js';

const suiClient = new SuiClient({
  url: 'https://fullnode.devnet.sui.io:443',
});

export async function getSuiBalance(address: string) {
  try {
    const balance = await suiClient.getBalance({
      owner: address  
    });
    return balance;
  } catch (error) {
    logError('Failed to get SUI balance:', error);
    throw error;
  }
}

export async function getTransactionDetails(txId: string) {
  try {
    const details = await suiClient.getTransactionBlock({
      digest: txId  
    });
    return details;
  } catch (error) {
    logError('Failed to get transaction details:', error);
    throw error;
  }
}