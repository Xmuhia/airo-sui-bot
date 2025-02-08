import { SuiClient } from '@mysten/sui.js/client';
import dotenv from 'dotenv';
import { logInfo, logError } from '../utils/logger.js';

dotenv.config();



const suiClient = new SuiClient({
  url: 'https://fullnode.devnet.sui.io:443'
});

// Keep track of processed transactions to avoid duplicates
const processedTransactions = new Set<string>();

// Interface for better type safety
interface TransactionResponse {
  digest: string;
  timestamp_ms?: number;
  transaction?: {
    data: {
      sender: string;
      gasData: {
        payment: string[];
        price: string;
        budget: string;
      };
    };
  };
}

export async function listenForTransactions() {
  try {
    logInfo('Listening for AIRO token transactions...');
    
    if (!process.env.SUI_ADDRESS) {
      throw new Error('SUI_ADDRESS not configured in environment variables');
    }

    const filter = {
        FromAddress: process.env.SUI_ADDRESS
    };

    const transactions = await suiClient.queryTransactionBlocks({
      filter,
      options: {
        showInput: true,
        showEffects: true,
        showEvents: true,
        showBalanceChanges: true  
      },
      limit: 10,
    });

    if (!transactions?.data) {
      logInfo('No transaction data received');
      return;
    }

    for (const tx of transactions.data) {
      // Skip processed transaction
      if (processedTransactions.has(tx.digest)) {
        continue;
      }

      logInfo(`New transaction detected: ${tx.digest}`);
      
      try {
        // Get detailed transaction info
        const txDetails = await suiClient.getTransactionBlock({
          digest: tx.digest,
          options: {
            showEffects: true,
            showInput: true,
            showEvents: true,
            showBalanceChanges: true
          }
        });

        // Process transaction details
        if (txDetails) {
          processTransaction(txDetails as TransactionResponse);
          processedTransactions.add(tx.digest);
        }
      } catch (txError) {
        logError(`Error processing transaction ${tx.digest}:`, txError);
        continue;
      }
    }

    // Prevent memory leaks by limiting the processedTransactions
    if (processedTransactions.size > 1000) {
      const oldestTransactions = Array.from(processedTransactions).slice(0, 500);
      oldestTransactions.forEach(tx => processedTransactions.delete(tx));
    }

  } catch (error) {
    if (error instanceof Error) {
      logError('Error in transaction listener:', error.message);
    } else {
      logError('Unknown error in transaction listener:', error);
    }
  }
}

function processTransaction(tx: TransactionResponse) {
  try {
    logInfo(`Processing transaction: ${tx.digest}`);
    
    // Transaction processing logic here
  
    
    logInfo(`Transaction ${tx.digest} processed successfully`);
  } catch (error) {
    logError(`Error processing transaction ${tx.digest}:`, error);
  }
}

export function startTransactionListener(interval = 60000) {
  // Initial check
  listenForTransactions().catch(error => {
    logError('Error in initial transaction check:', error);
  });

  //Periodic checking
  const intervalId = setInterval(async () => {
    try {
      await listenForTransactions();
    } catch (error) {
      logError('Error in periodic transaction check:', error);
    }
  }, interval);

  // Return the interval ID so it can be cleared if needed
  return intervalId;
}

// Clean shutdown function
export function stopTransactionListener(intervalId: NodeJS.Timeout) {
  clearInterval(intervalId);
  logInfo('Transaction listener stopped');
}