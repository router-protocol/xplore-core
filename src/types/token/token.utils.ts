/**
 * Utility functions for token operations
 */

import type { Token } from './token.types';
import type { Address, ChainId } from '../common/branded.types';

/**
 * Special addresses for native tokens
 */
export const NATIVE_TOKEN_ADDRESSES = [
  '0x0000000000000000000000000000000000000000',
  '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
] as const;

/**
 * Utility functions for common token operations
 * Provides helper methods for token comparison, identification, and display
 */
export const TokenUtils = {
  /**
   * Check if a token is native (ETH, SOL, etc.)
   * @param token - The token to check
   * @returns true if the token is a native blockchain token
   */
  isNativeToken(token: Token): boolean {
    const addressLower = token.address.toLowerCase();
    return (
      token.isNative === true ||
      NATIVE_TOKEN_ADDRESSES.some(addr => addr.toLowerCase() === addressLower)
    );
  },

  /**
   * Get display name for a token
   * @param token - The token to get the display name for
   * @returns The label, name, or symbol (in order of preference)
   */
  getDisplayName(token: Token): string {
    return token.label || token.name || token.symbol;
  },

  /**
   * Compare two tokens for equality
   * @param token1 - First token to compare
   * @param token2 - Second token to compare
   * @returns true if tokens have the same address and chain
   */
  areEqual(token1: Token, token2: Token): boolean {
    return (
      token1.address.toLowerCase() === token2.address.toLowerCase() &&
      token1.chainId === token2.chainId
    );
  },

  /**
   * Create a unique identifier for a token
   * @param token - The token to create an ID for
   * @returns A unique string in format "chainId-address"
   */
  getUniqueId(token: { chainId: ChainId; address: Address }): string {
    return `${token.chainId}-${token.address.toLowerCase()}`;
  },

  /**
   * Format token amount with proper decimals
   * @param amount - Raw amount in smallest unit
   * @param decimals - Number of decimals for the token
   * @returns Formatted string representation
   */
  formatAmount(amount: string | bigint, decimals: number): string {
    const value = BigInt(amount);
    const divisor = BigInt(10 ** decimals);
    const quotient = value / divisor;
    const remainder = value % divisor;

    if (remainder === 0n) {
      return quotient.toString();
    }

    const remainderStr = remainder.toString().padStart(decimals, '0');
    const trimmed = remainderStr.replace(/0+$/, '');
    return `${quotient}.${trimmed}`;
  },

  /**
   * Parse formatted amount to raw amount
   * @param formatted - Formatted amount string
   * @param decimals - Number of decimals for the token
   * @returns Raw amount as bigint
   */
  parseAmount(formatted: string, decimals: number): bigint {
    const [whole, fraction = ''] = formatted.split('.');
    const paddedFraction = fraction.padEnd(decimals, '0').slice(0, decimals);
    return BigInt(whole + paddedFraction);
  },

  /**
   * Sort tokens by USD value (highest first)
   */
  sortByValue(tokens: Array<{ valueUsd: number | null }>): typeof tokens {
    return [...tokens].sort((a, b) => {
      const aValue = a.valueUsd ?? 0;
      const bValue = b.valueUsd ?? 0;
      return bValue - aValue;
    });
  }
};