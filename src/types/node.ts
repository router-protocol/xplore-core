export enum AvailableNodes {
  RELAY = "relay",
  DEBRIDGE = "debridge", 
  ACROSS = "across",
  OPENOCEAN = "openocean",
  THORCHAIN = "thorchain",
  STARGATE_TAXI = "stargate_taxi",
  MAYAN_FMCTP = "mayan_fmctp",
  MAYAN_SWIFT = "mayan_swift",
  GASZIP_NATIVE = "gaszip_native"
}

export const NodeDisplayNames: Record<AvailableNodes, string> = {
  [AvailableNodes.RELAY]: "Relay",
  [AvailableNodes.DEBRIDGE]: "deBridge",
  [AvailableNodes.ACROSS]: "Across",
  [AvailableNodes.OPENOCEAN]: "OpenOcean",
  [AvailableNodes.THORCHAIN]: "THORChain",
  [AvailableNodes.STARGATE_TAXI]: "Stargate Taxi",
  [AvailableNodes.MAYAN_FMCTP]: "Mayan Using CCTP",
  [AvailableNodes.MAYAN_SWIFT]: "Mayan Swift",
  [AvailableNodes.GASZIP_NATIVE]: "GasZip"
};

// Chain compatibility mapping
export const CHAIN_NODE_COMPATIBILITY: Record<string, AvailableNodes[]> = {
  sol: [AvailableNodes.RELAY, AvailableNodes.DEBRIDGE, AvailableNodes.ACROSS],
  sui: [AvailableNodes.RELAY],
  btc: [AvailableNodes.THORCHAIN, AvailableNodes.RELAY],
  default: [
    AvailableNodes.RELAY, 
    AvailableNodes.DEBRIDGE, 
    AvailableNodes.OPENOCEAN, 
    AvailableNodes.MAYAN_FMCTP, 
    AvailableNodes.MAYAN_SWIFT, 
    AvailableNodes.ACROSS,  
    AvailableNodes.THORCHAIN, 
    AvailableNodes.STARGATE_TAXI,
    AvailableNodes.GASZIP_NATIVE
  ]
};

// Get display name for a node
export function getNodeDisplayName(node: AvailableNodes): string {
  return NodeDisplayNames[node] || node.charAt(0).toUpperCase() + node.slice(1);
}