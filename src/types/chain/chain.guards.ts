/**
 * Type guards for chain types
 */

import type { Chain, ChainType } from './chain.types';
import { CHAIN_TYPES } from './chain.types';

/**
 * Check if a value is a valid Chain object
 */
export function isChain(value: unknown): value is Chain {
  return (
    typeof value === 'object' &&
    value !== null &&
    'chainId' in value &&
    'type' in value &&
    'name' in value &&
    'displayName' in value &&
    'icon' in value &&
    'explorerUrl' in value &&
    'nativeCurrency' in value
  );
}

/**
 * Check if a value is a valid ChainType
 */
export function isChainType(value: unknown): value is ChainType {
  return typeof value === 'string' && CHAIN_TYPES.includes(value as ChainType);
}

/**
 * Check if a chain is an EVM chain
 */
export function isEvmChain(chain: Chain): boolean {
  return chain.type === 'evm';
}

/**
 * Check if a chain is a Solana chain
 */
export function isSolanaChain(chain: Chain): boolean {
  return chain.type === 'sol';
}

/**
 * Check if a chain is a Sui chain
 */
export function isSuiChain(chain: Chain): boolean {
  return chain.type === 'sui';
}

/**
 * Check if a chain is a Bitcoin chain
 */
export function isBitcoinChain(chain: Chain): boolean {
  return chain.type === 'btc';
}