import dotenv from 'dotenv';

dotenv.config();

export const CONFIG = {
  SUI_MNEMONIC: process.env.SUI_MNEMONIC || '',
  SUI_ADDRESS: process.env.SUI_ADDRESS || '',
  AIRO_TOKEN_CONTRACT: process.env.AIRO_TOKEN_CONTRACT || '',
  SUI_NODE_URL: 'https://fullnode.devnet.sui.io:443',
};
