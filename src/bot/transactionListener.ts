import { JsonRpcProvider } from '@mysten/sui.js';
import { logInfo } from '../utils/logger';

const provider = new JsonRpcProvider('https://fullnode.devnet.sui.io/');

export async function listenForTransactions() {
  logInfo('Listening for AIRO token transactions...');

  provider.subscribeEvent(
    { filter: { All: [] } },  // Subscribe to all events
    (event) => {
      if (event && event.type === 'AiroTokenTransfer') {
        logInfo(`AIRO Token transfer detected: ${JSON.stringify(event)}`);
        // Process the event, e.g., notify the sender or update a database
      }
    }
  );
}
