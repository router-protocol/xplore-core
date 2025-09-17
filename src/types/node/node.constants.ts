/**
 * Node-related constants
 */

import { AvailableNodes, BridgeNodes, ExchangeNodes, NodeCategory } from './node.types';

/**
 * Human-readable display names for each routing node
 * Used for UI presentation and user-facing messages
 */
export const NodeDisplayNames: Record<AvailableNodes, string> = {
  [BridgeNodes.RELAY]: "Relay",
  [BridgeNodes.DEBRIDGE]: "deBridge",
  [BridgeNodes.ACROSS]: "Across",
  [BridgeNodes.THORCHAIN]: "THORChain",
  [BridgeNodes.STARGATE_TAXI]: "Stargate Taxi",
  [BridgeNodes.MAYAN_FMCTP]: "Mayan Using CCTP",
  [BridgeNodes.MAYAN_SWIFT]: "Mayan Swift",
  [BridgeNodes.GASZIP_NATIVE]: "GasZip",
  [ExchangeNodes.OPENOCEAN]: "OpenOcean"
};

/**
 * Categorization of nodes by their primary function
 * Maps each node to its category (bridge or exchange)
 */
export const NODE_CATEGORIES: Record<AvailableNodes, NodeCategory> = {
  [BridgeNodes.RELAY]: NodeCategory.BRIDGE,
  [BridgeNodes.DEBRIDGE]: NodeCategory.BRIDGE,
  [BridgeNodes.ACROSS]: NodeCategory.BRIDGE,
  [BridgeNodes.THORCHAIN]: NodeCategory.BRIDGE,
  [BridgeNodes.STARGATE_TAXI]: NodeCategory.BRIDGE,
  [BridgeNodes.MAYAN_FMCTP]: NodeCategory.BRIDGE,
  [BridgeNodes.MAYAN_SWIFT]: NodeCategory.BRIDGE,
  [BridgeNodes.GASZIP_NATIVE]: NodeCategory.BRIDGE,
  [ExchangeNodes.OPENOCEAN]: NodeCategory.EXCHANGE
};

/**
 * Mapping of chain types to compatible routing nodes
 * Determines which nodes can be used for specific blockchain types
 * @example
 * // Get available nodes for Solana
 * const solanaNodes = CHAIN_NODE_COMPATIBILITY.sol;
 */
export const CHAIN_NODE_COMPATIBILITY: Record<string, AvailableNodes[]> = {
  sol: [BridgeNodes.RELAY, BridgeNodes.DEBRIDGE, BridgeNodes.ACROSS],
  sui: [BridgeNodes.RELAY],
  btc: [BridgeNodes.THORCHAIN, BridgeNodes.RELAY],
  default: [
    BridgeNodes.RELAY,
    BridgeNodes.DEBRIDGE,
    BridgeNodes.ACROSS,
    BridgeNodes.THORCHAIN,
    BridgeNodes.STARGATE_TAXI,
    BridgeNodes.MAYAN_FMCTP,
    BridgeNodes.MAYAN_SWIFT,
    BridgeNodes.GASZIP_NATIVE,
    ExchangeNodes.OPENOCEAN
  ]
};