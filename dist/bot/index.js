import dotenv from 'dotenv';
import bot from './elizaSetup'; 
import { listenForTransactions } from './transactionListener';
import { logInfo } from '../utils/logger';
dotenv.config();
async function startBot() {
    try {
        logInfo('Starting AIRO Bot...');
        bot.start(); 
        listenForTransactions(); 
        logInfo('AIRO Bot is running and listening for transactions.');
    }
    catch (error) {
        console.error('Failed to start AIRO Bot:', error);
    }
}
startBot();
