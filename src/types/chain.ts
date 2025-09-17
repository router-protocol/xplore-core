/**
 * Unified Chain Type Definitions
 *
 * This file contains all chain-related type definitions for the application.
 * Following the same pattern as types/Node.ts for consistency.
 */

import type { Chain as ViemChain } from "viem";

/**
 * Supported blockchain types
 * Using const assertion for better type inference
 */
export const CHAIN_TYPES = ["evm", "sol", "sui", "btc"] as const;
export type ChainType = typeof CHAIN_TYPES[number];

/**
 * Core Chain interface - represents a blockchain network
 * All fields are required as chains are core infrastructure
 */
export interface Chain {
  // Core identification
  chainId: string;
  type: ChainType;
  name: string; // Internal name (e.g., "ethereum_mainnet")
  displayName: string; // User-facing name (e.g., "Ethereum")

  // Display fields (required for consistent UI)
  icon: string; // Chain icon URL
  explorerUrl: string; // Block explorer URL

  // Native currency information
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

/**
 * Extended chain configuration with network details
 */
export interface ChainConfig extends Chain {
  httpRpcUrl?: string; // RPC endpoint URL
  isSupported: boolean; // Whether the chain is currently supported
  viemChain?: ViemChain; // Viem chain configuration for EVM chains
}

/**
 * Chain with additional metadata
 */
export interface ChainWithMetadata extends Omit<Chain, 'icon'> {
  icon: {
    light?: string; // Light mode icon
    dark?: string; // Dark mode icon
  } | string;
  metadata?: {
    color?: string; // Brand color
    website?: string; // Official website
    documentation?: string; // Documentation URL
  };
}

/**
 * Collection of chains organized by ID
 */
export interface ChainsByID {
  [chainId: string]: Chain;
}

/**
 * Network configuration from network.json
 */
export interface NetworkConfig {
  chainId: string;
  name: string;
  displayName: string;
  chainType: ChainType;
  httpRpcUrl?: string;
  explorerUrl: string;
  currency: {
    id: string;
    symbol: string;
    name: string;
    address: string;
    decimals: number;
    icon?: string;
  };
  erc20Currencies?: Array<{
    id: string;
    symbol: string;
    name: string;
    address: string;
    decimals: number;
    icon?: string;
    tags?: string[];
  }>;
  icon?: {
    light?: string;
    dark?: string;
  };
}

/**
 * Type guards for chain types
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

export function isChainType(value: unknown): value is ChainType {
  return typeof value === 'string' && CHAIN_TYPES.includes(value as ChainType);
}

export function isEvmChain(chain: Chain): boolean {
  return chain.type === 'evm';
}

export function isSolanaChain(chain: Chain): boolean {
  return chain.type === 'sol';
}

export function isSuiChain(chain: Chain): boolean {
  return chain.type === 'sui';
}

export function isBitcoinChain(chain: Chain): boolean {
  return chain.type === 'btc';
}

/**
 * Utility functions for chain operations
 */
export const ChainUtils = {
  /**
   * Get chain by ID from a collection
   */
  getChainById(chains: Chain[], chainId: string): Chain | undefined {
    return chains.find(chain => chain.chainId === chainId);
  },

  /**
   * Get chains by type
   */
  getChainsByType(chains: Chain[], type: ChainType): Chain[] {
    return chains.filter(chain => chain.type === type);
  },

  /**
   * Get explorer URL for a transaction
   */
  getExplorerTxUrl(chain: Chain, txHash: string): string {
    const baseUrl = chain.explorerUrl.replace(/\/$/, '');
    if (chain.type === 'evm') {
      return `${baseUrl}/tx/${txHash}`;
    }
    if (chain.type === 'sol') {
      return `${baseUrl}/tx/${txHash}`;
    }
    if (chain.type === 'sui') {
      return `${baseUrl}/txblock/${txHash}`;
    }
    if (chain.type === 'btc') {
      return `${baseUrl}/tx/${txHash}`;
    }
    return `${baseUrl}/tx/${txHash}`;
  },

  /**
   * Get explorer URL for an address
   */
  getExplorerAddressUrl(chain: Chain, address: string): string {
    const baseUrl = chain.explorerUrl.replace(/\/$/, '');
    if (chain.type === 'evm') {
      return `${baseUrl}/address/${address}`;
    }
    if (chain.type === 'sol') {
      return `${baseUrl}/address/${address}`;
    }
    if (chain.type === 'sui') {
      return `${baseUrl}/account/${address}`;
    }
    if (chain.type === 'btc') {
      return `${baseUrl}/address/${address}`;
    }
    return `${baseUrl}/address/${address}`;
  },

  /**
   * Get chain display icon (handles light/dark modes)
   */
  getChainIcon(chain: Chain | ChainWithMetadata, preferDark = false): string {
    if (typeof chain.icon === 'string') {
      return chain.icon;
    }
    if (typeof chain.icon === 'object') {
      return preferDark && chain.icon.dark ? chain.icon.dark : chain.icon.light || '';
    }
    return '';
  },

  /**
   * Compare two chains for equality
   */
  areEqual(chain1: Chain, chain2: Chain): boolean {
    return chain1.chainId === chain2.chainId;
  },

  /**
   * Sort chains by display name
   */
  sortByDisplayName(chains: Chain[]): Chain[] {
    return [...chains].sort((a, b) => a.displayName.localeCompare(b.displayName));
  },

  /**
   * Group chains by type
   */
  groupByType(chains: Chain[]): Record<ChainType, Chain[]> {
    const grouped: Record<ChainType, Chain[]> = {
      evm: [],
      sol: [],
      sui: [],
      btc: []
    };

    chains.forEach(chain => {
      grouped[chain.type].push(chain);
    });

    return grouped;
  }
};

/**
 * Legacy ChainType enum for backward compatibility
 * @deprecated Use ChainType union instead
 */
export enum ChainTypeEnum {
  Evm = "evm",
  Sol = "sol",
  Btc = "btc",
  Sui = "sui"
}

/**
 * Convert legacy enum to new union type
 * @deprecated Will be removed in future versions
 */
export function fromChainTypeEnum(enumValue: ChainTypeEnum): ChainType {
  return enumValue as ChainType;
}

/**
 * Convert new union type to legacy enum
 * @deprecated Will be removed in future versions
 */
export function toChainTypeEnum(chainType: ChainType): ChainTypeEnum {
  switch (chainType) {
    case 'evm': return ChainTypeEnum.Evm;
    case 'sol': return ChainTypeEnum.Sol;
    case 'btc': return ChainTypeEnum.Btc;
    case 'sui': return ChainTypeEnum.Sui;
  }
}


export const SOLANA_AS_RELAY_NUM = 792703809;
