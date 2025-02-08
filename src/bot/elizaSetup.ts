import ElizaBot from 'eliza-bot';
import { logInfo } from '../utils/logger.js';
import { exchangeSuiForAiro } from './tokenService.js';

// Initialize ElizaBot with default configuration
const eliza = new ElizaBot();

// Custom response patterns
const customResponses = {
  'air quality': (input: string) => {
    return 'You can check air quality data at airomap.com';
  },
  'exchange': async (input: string, sender: string) => {
    const match = input.match(/exchange (\d+) SUI for AIRO/i);
    if (match) {
      const amount = parseInt(match[1], 10);
      try {
        await exchangeSuiForAiro(amount, sender);
        return `Processing exchange of ${amount} SUI for AIRO tokens...`;
      } catch (error) {
        return 'Sorry, there was an error processing your exchange.';
      }
    }
    return 'Please specify the amount of SUI to exchange. Example: "Exchange 100 SUI for AIRO"';
  },
  'help': () => {
    return `
I can help you with:
- Checking air quality (ask about air quality in your location)
- Exchanging SUI for AIRO tokens (say "Exchange X SUI for AIRO")
- Learning about AIRO Network (ask any question about AIRO)
    `;
  }
};

// Enhanced transform function
const enhancedTransform = (input: string, sender?: string) => {
  // Check for specific commands first
  if (input.toLowerCase().includes('air quality')) {
    return customResponses['air quality'](input);
  }
  
  if (input.toLowerCase().includes('exchange')) {
    return customResponses['exchange'](input, sender || 'unknown');
  }
  
  if (input.toLowerCase().includes('help')) {
    return customResponses['help']();
  }
  
  // Fall back to default Eliza response
  return eliza.transform(input);
};

export default {
  start() {
    logInfo('Enhanced ElizaBot started. Ready to interact.');
    
    // Example usage
    const userInput = 'Hello, I need some help with my AIRO tokens.';
    const response = enhancedTransform(userInput);
    logInfo(`User: ${userInput}`);
    logInfo(`Eliza: ${response}`);
  },
  processInput(input: string, sender?: string) {
    return enhancedTransform(input, sender);
  }
};