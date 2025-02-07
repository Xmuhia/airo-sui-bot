import ElizaBot from 'eliza-bot';
import { logInfo } from '../utils/logger';

const eliza = new ElizaBot();

export default {
  start() {
    logInfo('ElizaBot started. Ready to interact.');
    // Simulate a simple interaction
    const userInput = 'Hello, I need some help with my AIRO tokens.';
    const response = eliza.transform(userInput);
    logInfo(`User: ${userInput}`);
    logInfo(`Eliza: ${response}`);
  }
};
