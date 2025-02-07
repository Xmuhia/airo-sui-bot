import { SuiClient } from '@mysten/sui.js/client';
import dotenv from 'dotenv';
import { logInfo } from '../utils/logger';
dotenv.config();
const suiClient = new SuiClient({
    url: 'https://fullnode.devnet.sui.io:443',
});
const suiAddress = process.env.SUI_ADDRESS || '';
export async function listenForTransactions() {
    logInfo('Listening for AIRO token transactions...');
    const transactions = await suiClient.queryTransactionBlocks({
        filter: { FromAddress: suiAddress },
        limit: 10, // Add a limit to prevent overwhelming retrieval
    });
    for (const tx of transactions.data) {
        logInfo(`Transaction detected: ${JSON.stringify(tx)}`);
    }
}
