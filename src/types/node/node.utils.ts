/**
 * Node utility functions
 */

import { AvailableNodes, BridgeNodes, ExchangeNodes, NodeCategory } from './node.types';
import { NodeDisplayNames, NODE_CATEGORIES } from './node.constants';

/**
 * Get the human-readable display name for a routing node
 * @param node - The AvailableNodes enum value
 * @returns The display name string, falls back to capitalized node name if not found
 * @example
 * getNodeDisplayName(BridgeNodes.RELAY) // Returns "Relay"
 */
export function getNodeDisplayName(node: AvailableNodes): string {
  return NodeDisplayNames[node] || node.charAt(0).toUpperCase() + node.slice(1);
}

/**
 * Check if a node is a bridge
 * @param node - The node to check
 * @returns True if the node is a bridge, false otherwise
 * @example
 * isBridgeNode(BridgeNodes.RELAY) // Returns true
 * isBridgeNode(ExchangeNodes.OPENOCEAN) // Returns false
 */
export function isBridgeNode(node: AvailableNodes): node is BridgeNodes {
  return NODE_CATEGORIES[node] === NodeCategory.BRIDGE;
}

/**
 * Check if a node is an exchange/DEX aggregator
 * @param node - The node to check
 * @returns True if the node is an exchange, false otherwise
 * @example
 * isExchangeNode(ExchangeNodes.OPENOCEAN) // Returns true
 * isExchangeNode(BridgeNodes.RELAY) // Returns false
 */
export function isExchangeNode(node: AvailableNodes): node is ExchangeNodes {
  return NODE_CATEGORIES[node] === NodeCategory.EXCHANGE;
}

/**
 * Get all bridge nodes
 * @returns Array of all bridge node enum values
 */
export function getBridgeNodes(): BridgeNodes[] {
  return Object.values(BridgeNodes);
}

/**
 * Get all exchange nodes
 * @returns Array of all exchange node enum values
 */
export function getExchangeNodes(): ExchangeNodes[] {
  return Object.values(ExchangeNodes);
}

/**
 * Get the category of a node
 * @param node - The node to categorize
 * @returns The node's category (bridge or exchange)
 * @example
 * getNodeCategory(BridgeNodes.RELAY) // Returns NodeCategory.BRIDGE
 */
export function getNodeCategory(node: AvailableNodes): NodeCategory {
  return NODE_CATEGORIES[node];
}

/**
 * Node utility functions collection
 */
export const NodeUtils = {
  /**
   * Get display name for a node
   */
  getDisplayName: getNodeDisplayName,

  /**
   * Check if a node is a bridge
   */
  isBridge: isBridgeNode,

  /**
   * Check if a node is an exchange
   */
  isExchange: isExchangeNode,

  /**
   * Get node category
   */
  getCategory: getNodeCategory,

  /**
   * Get all bridge nodes
   */
  getBridges: getBridgeNodes,

  /**
   * Get all exchange nodes
   */
  getExchanges: getExchangeNodes,

  /**
   * Get all available nodes as an array
   */
  getAllNodes(): AvailableNodes[] {
    return [...getBridgeNodes(), ...getExchangeNodes()];
  },

  /**
   * Check if a string is a valid node identifier
   */
  isValidNode(value: string): value is AvailableNodes {
    return this.getAllNodes().includes(value as AvailableNodes);
  },

  /**
   * Convert node to lowercase string
   */
  toLowerCase(node: AvailableNodes): string {
    return node.toLowerCase();
  },

  /**
   * Compare two nodes for equality
   */
  areEqual(node1: AvailableNodes, node2: AvailableNodes): boolean {
    return node1 === node2;
  }
};