import dotenv from 'dotenv';
import bot from './elizaSetup.js';
import { listenForTransactions } from './transactionListener.js';
import { logInfo } from '../utils/logger.js';

dotenv.config();

// Function to periodically check transactions
function startTransactionMonitoring(interval = 60000) { // default 1 minute
  return setInterval(async () => {
    try {
      await listenForTransactions();
    } catch (error) {
      console.error('Transaction monitoring error:', error);
    }
  }, interval);
}

async function startBot() {
  try {
    logInfo('Starting AIRO Bot...');
    
    // Start the Eliza bot for handling interactions
    bot.start();
    
    // Start periodic transaction monitoring
    startTransactionMonitoring();
    
    // Initial transaction check
    await listenForTransactions();
    
    logInfo('AIRO Bot is running and listening for transactions.');
  } catch (error) {
    console.error('Failed to start AIRO Bot:', error);
    process.exit(1); // Exit if initialization fails
  }
}

// Handle unexpected errors
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});

startBot();