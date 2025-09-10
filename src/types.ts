/**
 * Core types for the Router Aggregator SDK
 */

export interface Token {
  name: string;
  symbol: string;
  decimal: string;
  chainId: string;
}
export interface RouterConfig {
  id: string;
  name: string;
  endpoint: string;
  timeout?: number;
}

export interface AggregatorOptions {
  routers: RouterConfig[];
  defaultTimeout?: number;
  maxRetries?: number;
}

export interface RouterResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  routerId: string;
  timestamp: number;
}

export interface AggregatorResult<T = unknown> {
  results: RouterResponse<T>[];
  successful: RouterResponse<T>[];
  failed: RouterResponse<T>[];
  totalTime: number;
}