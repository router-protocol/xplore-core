/**
 * Core token type definitions
 */

import type { Address, ChainId, TokenSymbol } from '../common/branded.types';

/**
 * Core Token interface - represents a token across any blockchain
 * All fields are required for basic token functionality
 */
export interface Token {
  // Core identification fields (always required)
  address: Address;
  symbol: TokenSymbol;
  decimals: number;
  name: string;
  chainId: ChainId;

  // UI/Display fields (optional for flexibility)
  label?: string; // Display label (may differ from name)
  icon?: string; // Token icon URL
  isNative?: boolean; // Whether this is the chain's native token
  tags?: string[]; // Tags like "stable", "governance", etc.
  chainName?: string; // Human-readable chain name for display
}

/**
 * Token with balance information - extends base Token
 * Used when displaying user balances
 */
export interface TokenWithBalance extends Token {
  amount: string; // Raw balance amount (in smallest unit)
  valueUsd: number | null; // USD value of the balance
  priceUsd: number | null; // Current USD price per token
  metadata?: {
    logo?: string; // Alternative logo URL
    verified?: boolean; // Whether token is verified
  };
  lowLiquidity?: boolean; // Liquidity warning flag
}

/**
 * Minimal token representation
 * Only includes absolutely necessary fields
 */
export interface TokenMinimal {
  chainId: ChainId;
  address: Address;
  decimals: number;
}

/**
 * Token balance from wallet/RPC queries
 * Used for displaying user balances
 */
export interface TokenBalance {
  amount: string;
  valueUsd: number | null;
  priceUsd: number | null;
  symbol: TokenSymbol;
  decimals: number;
  tokenMetadata?: {
    logo?: string;
  };
  lowLiquidity?: boolean;
}

/**
 * Collection of tokens organized by chain
 */
export interface TokensByChain {
  [chainId: ChainId]: Token[];
}