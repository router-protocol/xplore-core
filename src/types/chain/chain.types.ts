/**
 * Core chain type definitions
 */

import type { Chain as ViemChain } from "viem";
import type { ChainId } from "../common/branded.types";

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
  chainId: ChainId;
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
  [chainId: ChainId]: Chain;
}

/**
 * Network configuration from network.json
 */
export interface NetworkConfig {
  chainId: ChainId;
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