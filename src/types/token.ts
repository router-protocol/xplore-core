/**
 * Unified Token Type Definitions
 *
 * This file contains all token-related type definitions for the application.
 * Following the same pattern as types/Node.ts for consistency.
 */

/**
 * Core Token interface - represents a token across any blockchain
 * All fields are required for basic token functionality
 */
export interface Token {
  // Core identification fields (always required)
  address: string;
  symbol: string;
  decimals: number;
  name: string; // Now required for consistency
  chainId: string; // Always required to identify the chain

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
 * Proto Token for gRPC API communication
 * Uses snake_case to match protobuf conventions
 */
export interface ProtoToken {
  chain_id: string;
  address: string;
  decimals: number;
  symbol?: string;
  name?: string;
  logo_url?: string;
  price_usd?: string;
}

/**
 * Minimal token representation for gRPC calls
 * Only includes absolutely necessary fields
 */
export interface ChainToken {
  chain_id: string;
  address: string;
  decimals: number;
}

/**
 * API response format for token data
 * Used by search and external APIs
 */
export interface ApiTokenData {
  address: string;
  chain_id: string;
  name: string;
  symbol: string;
  decimals: string; // String from API, needs parsing
  icon?: string;
}

/**
 * Relay API specific token format
 */
export interface RelayApiToken {
  chainId: number; // Number in Relay API
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  vmType: string;
  metadata: {
    logoURI: string;
    verified: boolean;
  };
}

/**
 * Token balance from wallet/RPC queries
 * Used for displaying user balances
 */
export interface TokenBalance {
  amount: string;
  value_usd: number | null;
  price_usd: number | null;
  symbol: string;
  decimals: number;
  token_metadata?: {
    logo?: string;
  };
  low_liquidity?: boolean;
}

/**
 * Collection of tokens organized by chain
 */
export interface TokensByChain {
  [chainId: string]: Token[];
}

/**
 * Type guards for token types
 */
export function isToken(value: unknown): value is Token {
  return (
    typeof value === 'object' &&
    value !== null &&
    'address' in value &&
    'symbol' in value &&
    'decimals' in value &&
    'name' in value &&
    'chainId' in value
  );
}

export function isTokenWithBalance(value: unknown): value is TokenWithBalance {
  return (
    isToken(value) &&
    'amount' in value &&
    'valueUsd' in value &&
    'priceUsd' in value
  );
}

export function isProtoToken(value: unknown): value is ProtoToken {
  return (
    typeof value === 'object' &&
    value !== null &&
    'chain_id' in value &&
    'address' in value &&
    'decimals' in value
  );
}

/**
 * Utility functions for token operations
 */
export const TokenUtils = {
  /**
   * Check if a token is native (ETH, SOL, etc.)
   */
  isNativeToken(token: Token): boolean {
    return token.isNative === true ||
           token.address === '0x0000000000000000000000000000000000000000' ||
           token.address.toLowerCase() === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
  },

  /**
   * Get display name for a token
   */
  getDisplayName(token: Token): string {
    return token.label || token.name || token.symbol;
  },

  /**
   * Compare two tokens for equality
   */
  areEqual(token1: Token, token2: Token): boolean {
    return (
      token1.address.toLowerCase() === token2.address.toLowerCase() &&
      token1.chainId === token2.chainId
    );
  },

  /**
   * Create a unique identifier for a token
   */
  getUniqueId(token: Token): string {
    return `${token.chainId}-${token.address.toLowerCase()}`;
  }
};