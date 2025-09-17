/**
 * Chain-related constants
 */

/**
 * Solana chain ID when used as a Relay node
 * This is a special identifier used internally by the Relay protocol
 */
export const SOLANA_AS_RELAY_NUM = 792703809;

/**
 * Common chain IDs for reference
 */
export const CHAIN_IDS = {
  // EVM Chains
  ETHEREUM_MAINNET: '1',
  POLYGON: '137',
  BSC: '56',
  AVALANCHE: '43114',
  ARBITRUM: '42161',
  OPTIMISM: '10',
  BASE: '8453',

  // Other chains
  SOLANA: 'solana',
  SUI: 'sui',
  BITCOIN: 'btc'
} as const;

/**
 * Default RPC endpoints for common chains
 * These are fallback endpoints when custom RPCs are not provided
 */
export const DEFAULT_RPC_URLS = {
  '1': 'https://eth.public-rpc.com',
  '137': 'https://polygon-rpc.com',
  '56': 'https://bsc-dataseed.binance.org',
  '43114': 'https://api.avax.network/ext/bc/C/rpc',
  '42161': 'https://arb1.arbitrum.io/rpc',
  '10': 'https://mainnet.optimism.io',
  '8453': 'https://mainnet.base.org'
} as const;