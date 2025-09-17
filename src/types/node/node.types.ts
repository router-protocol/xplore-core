/**
 * Node/Router type definitions
 */

/**
 * Base node categories
 */
export enum NodeCategory {
  BRIDGE = "bridge",
  EXCHANGE = "exchange"
}

/**
 * Bridge-specific node types
 * Cross-chain bridges that facilitate token transfers between different blockchains
 */
export enum BridgeNodes {
  /** Relay - Multi-chain bridge supporting EVM, Solana, Sui, and Bitcoin */
  RELAY = "relay",
  /** deBridge - Cross-chain liquidity protocol */
  DEBRIDGE = "debridge",
  /** Across - Optimistic cross-chain bridge */
  ACROSS = "across",
  /** THORChain - Native cross-chain liquidity protocol supporting Bitcoin */
  THORCHAIN = "thorchain",
  /** Stargate Taxi - Cross-chain bridge using LayerZero */
  STARGATE_TAXI = "stargate_taxi",
  /** Mayan protocol using Circle's Cross-Chain Transfer Protocol */
  MAYAN_FMCTP = "mayan_fmctp",
  /** Mayan Swift - Fast bridging solution from Mayan */
  MAYAN_SWIFT = "mayan_swift",
  /** GasZip - Native token bridge for gas fee optimization */
  GASZIP_NATIVE = "gaszip_native"
}

/**
 * Exchange/DEX aggregator node types
 * DEX aggregators that find optimal trading routes within and across chains
 */
export enum ExchangeNodes {
  /** OpenOcean - DEX aggregator with cross-chain capabilities */
  OPENOCEAN = "openocean"
}

/**
 * Union of all available nodes
 * Combines both bridge and exchange node types
 */
export type AvailableNodes = BridgeNodes | ExchangeNodes;