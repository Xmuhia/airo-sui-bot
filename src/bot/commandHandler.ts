import { exchangeSuiForAiro } from './tokenService';
import { logInfo, logError } from '../utils/logger';

export async function handleCommand(command: string, sender: string) {
  logInfo(`Handling command: ${command} from ${sender}`);

  try {
    if (command.startsWith('Exchange')) {
      const match = command.match(/Exchange (\d+) SUI for AIRO/);
      if (match) {
        const suiAmount = parseInt(match[1], 10);
        const result = await exchangeSuiForAiro(suiAmount, sender);
        logInfo(`Successfully exchanged ${suiAmount} SUI for AIRO tokens.`, result);
      } else {
        logInfo('Invalid command format.');
      }
    } else {
      logInfo('Command not recognized.');
    }
  } catch (error) {
    logError('Failed to handle command:', error);
  }
}
