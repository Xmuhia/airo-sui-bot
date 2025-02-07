import dotenv from 'dotenv';
import bot from './elizaSetup'; // create `elizaSetup` later
import { listenForTransactions } from './transactionListener';
import { logInfo } from '../utils/logger';

dotenv.config();

async function startBot() {
  try {
    logInfo('Starting AIRO Bot...');
    bot.start(); // Start the Eliza bot for handling Twitter interactions
    listenForTransactions(); // Monitor blockchain for relevant events
    logInfo('AIRO Bot is running and listening for transactions.');
  } catch (error) {
    console.error('Failed to start AIRO Bot:', error);
  }
}

startBot();
