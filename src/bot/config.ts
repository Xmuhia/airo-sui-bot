import dotenv from 'dotenv';
import { logError, logInfo } from '../utils/logger.js';

dotenv.config();
interface SuiConfig {
  SUI_MNEMONIC: string;
  SUI_ADDRESS: string;
  AIRO_TOKEN_CONTRACT: string;
  SUI_NODE_URL: string;
  isValid(): boolean;
}

class Configuration implements SuiConfig {
  SUI_MNEMONIC: string;
  SUI_ADDRESS: string;
  AIRO_TOKEN_CONTRACT: string;
  SUI_NODE_URL: string;

  constructor() {
    this.SUI_MNEMONIC = process.env.SUI_MNEMONIC || '';
    this.SUI_ADDRESS = process.env.SUI_ADDRESS || '';
    this.AIRO_TOKEN_CONTRACT = process.env.AIRO_TOKEN_CONTRACT || '';
    this.SUI_NODE_URL = 'https://fullnode.devnet.sui.io:443';
  }

  

  isValid(): boolean {
    const requiredVars = ['SUI_MNEMONIC', 'SUI_ADDRESS', 'AIRO_TOKEN_CONTRACT'];
    const missingVars = requiredVars.filter(varName => !this[varName as keyof this]);

    if (missingVars.length > 0) {
      logError(`Missing required environment variables: ${missingVars.join(', ')}`);
      return false;
    }

    // Validate SUI address format (should be 32 bytes / 64 chars hex)
    if (!/^0x[a-fA-F0-9]{64}$/.test(this.SUI_ADDRESS)) {
      logError('Invalid SUI_ADDRESS format');
      return false;
    }

    logInfo('Configuration validated successfully');
    return true;
  }
}

export const CONFIG = new Configuration();

// Validate on import
if (!CONFIG.isValid()) {
  throw new Error('Invalid configuration');
}