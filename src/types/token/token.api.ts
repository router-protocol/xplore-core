/**
 * API-specific token type definitions
 * These types are used for external API communication
 */

import type { Address, ChainId } from '../common/branded.types';

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
 * Chain token for gRPC calls
 * Minimal representation with snake_case
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
 * Transformers for API token formats
 */
export const TokenApiTransformers = {
  /**
   * Convert ProtoToken to internal Token format
   */
  fromProtoToken(proto: ProtoToken): {
    chainId: ChainId;
    address: Address;
    decimals: number;
    symbol?: string;
    name?: string;
    icon?: string;
    priceUsd?: number;
  } {
    const result: {
      chainId: ChainId;
      address: Address;
      decimals: number;
      symbol?: string;
      name?: string;
      icon?: string;
      priceUsd?: number;
    } = {
      chainId: proto.chain_id as ChainId,
      address: proto.address as Address,
      decimals: proto.decimals
    };

    if (proto.symbol !== undefined) result.symbol = proto.symbol;
    if (proto.name !== undefined) result.name = proto.name;
    if (proto.logo_url !== undefined) result.icon = proto.logo_url;
    if (proto.price_usd !== undefined) result.priceUsd = parseFloat(proto.price_usd);

    return result;
  },

  /**
   * Convert internal token to ProtoToken format
   */
  toProtoToken(token: {
    chainId: ChainId;
    address: Address;
    decimals: number;
    symbol?: string;
    name?: string;
    icon?: string;
  }): ProtoToken {
    const result: ProtoToken = {
      chain_id: token.chainId,
      address: token.address,
      decimals: token.decimals
    };

    if (token.symbol !== undefined) result.symbol = token.symbol;
    if (token.name !== undefined) result.name = token.name;
    if (token.icon !== undefined) result.logo_url = token.icon;

    return result;
  },

  /**
   * Convert ApiTokenData to internal format
   */
  fromApiTokenData(data: ApiTokenData): {
    address: Address;
    chainId: ChainId;
    name: string;
    symbol: string;
    decimals: number;
    icon?: string;
  } {
    const result = {
      address: data.address as Address,
      chainId: data.chain_id as ChainId,
      name: data.name,
      symbol: data.symbol,
      decimals: parseInt(data.decimals, 10)
    } as {
      address: Address;
      chainId: ChainId;
      name: string;
      symbol: string;
      decimals: number;
      icon?: string;
    };

    if (data.icon !== undefined) result.icon = data.icon;

    return result;
  }
};