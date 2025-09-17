/**
 * Utility functions for chain operations
 */

import type { Chain, ChainType, ChainWithMetadata } from './chain.types';
import type { ChainId, TxHash, Address } from '../common/branded.types';

/**
 * Utility functions for chain operations
 */
export const ChainUtils = {
  /**
   * Get chain by ID from a collection
   * @param chains - Array of chains to search
   * @param chainId - The chain ID to find
   * @returns The matching chain or undefined
   */
  getChainById(chains: Chain[], chainId: ChainId): Chain | undefined {
    return chains.find(chain => chain.chainId === chainId);
  },

  /**
   * Get chains by type
   * @param chains - Array of chains to filter
   * @param type - The chain type to filter by
   * @returns Array of chains matching the type
   */
  getChainsByType(chains: Chain[], type: ChainType): Chain[] {
    return chains.filter(chain => chain.type === type);
  },

  /**
   * Get explorer URL for a transaction
   * @param chain - The chain the transaction is on
   * @param txHash - The transaction hash
   * @returns The explorer URL for the transaction
   */
  getExplorerTxUrl(chain: Chain, txHash: TxHash): string {
    const baseUrl = chain.explorerUrl.replace(/\/$/, '');
    switch (chain.type) {
      case 'evm':
      case 'sol':
      case 'btc':
        return `${baseUrl}/tx/${txHash}`;
      case 'sui':
        return `${baseUrl}/txblock/${txHash}`;
      default:
        return `${baseUrl}/tx/${txHash}`;
    }
  },

  /**
   * Get explorer URL for an address
   * @param chain - The chain the address is on
   * @param address - The address to view
   * @returns The explorer URL for the address
   */
  getExplorerAddressUrl(chain: Chain, address: Address): string {
    const baseUrl = chain.explorerUrl.replace(/\/$/, '');
    switch (chain.type) {
      case 'evm':
      case 'sol':
      case 'btc':
        return `${baseUrl}/address/${address}`;
      case 'sui':
        return `${baseUrl}/account/${address}`;
      default:
        return `${baseUrl}/address/${address}`;
    }
  },

  /**
   * Get chain display icon (handles light/dark modes)
   * @param chain - The chain to get the icon for
   * @param preferDark - Whether to prefer dark mode icon
   * @returns The icon URL string
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
   * @param chain1 - First chain to compare
   * @param chain2 - Second chain to compare
   * @returns true if chains have the same ID
   */
  areEqual(chain1: Chain, chain2: Chain): boolean {
    return chain1.chainId === chain2.chainId;
  },

  /**
   * Sort chains by display name
   * @param chains - Array of chains to sort
   * @returns New sorted array of chains
   */
  sortByDisplayName(chains: Chain[]): Chain[] {
    return [...chains].sort((a, b) => a.displayName.localeCompare(b.displayName));
  },

  /**
   * Group chains by type
   * @param chains - Array of chains to group
   * @returns Object with chains grouped by type
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