/**
 * Branded types for enhanced type safety
 * These types help prevent accidental mixing of similar primitive types
 */

/**
 * Unique symbol for branding types
 */
declare const brand: unique symbol;

/**
 * Generic brand type utility
 */
type Brand<T, TBrand extends string> = T & { [brand]: TBrand };

/**
 * Branded type for blockchain addresses
 * Prevents accidental mixing of addresses with regular strings
 */
export type Address = Brand<string, 'Address'>;

/**
 * Branded type for chain IDs
 * Ensures chain IDs are not confused with other string identifiers
 */
export type ChainId = Brand<string, 'ChainId'>;

/**
 * Branded type for token symbols
 */
export type TokenSymbol = Brand<string, 'TokenSymbol'>;

/**
 * Branded type for transaction hashes
 */
export type TxHash = Brand<string, 'TxHash'>;

/**
 * Helper functions for creating branded types
 */
export const BrandedTypes = {
  /**
   * Create a branded Address from a string
   */
  address(value: string): Address {
    return value as Address;
  },

  /**
   * Create a branded ChainId from a string
   */
  chainId(value: string): ChainId {
    return value as ChainId;
  },

  /**
   * Create a branded TokenSymbol from a string
   */
  tokenSymbol(value: string): TokenSymbol {
    return value as TokenSymbol;
  },

  /**
   * Create a branded TxHash from a string
   */
  txHash(value: string): TxHash {
    return value as TxHash;
  },

  /**
   * Validate and create an Ethereum address
   */
  ethAddress(value: string): Address {
    const cleaned = value.toLowerCase();
    if (!/^0x[a-f0-9]{40}$/i.test(cleaned)) {
      throw new Error(`Invalid Ethereum address: ${value}`);
    }
    return cleaned as Address;
  },

  /**
   * Check if a string is a valid Ethereum address
   */
  isEthAddress(value: string): boolean {
    return /^0x[a-f0-9]{40}$/i.test(value);
  }
};