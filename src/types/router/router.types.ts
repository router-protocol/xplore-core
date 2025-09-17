/**
 * Router and Aggregator type definitions
 * Core types for the Router Aggregator SDK
 */

/**
 * Configuration for a single router endpoint
 */
export interface RouterConfig {
  /** Unique identifier for the router */
  id: string;
  /** Human-readable name of the router */
  name: string;
  /** Base endpoint URL for the router */
  endpoint: string;
  /** Optional timeout override for this router (ms) */
  timeout?: number;
}

/**
 * Options for configuring the Router Aggregator
 */
export interface AggregatorOptions {
  /** Array of router configurations to aggregate */
  routers: RouterConfig[];
  /** Default timeout for all routers (ms) */
  defaultTimeout?: number;
  /** Maximum number of retries for failed requests */
  maxRetries?: number;
}

/**
 * Response from a single router
 * Generic type T represents the expected response data structure
 */
export interface RouterResponse<T = unknown> {
  /** Whether the request was successful */
  success: boolean;
  /** Response data (only present on success) */
  data?: T;
  /** Error message (only present on failure) */
  error?: string;
  /** ID of the router that generated this response */
  routerId: string;
  /** Timestamp when the response was received */
  timestamp: number;
}

/**
 * Result from aggregating multiple router responses
 * Contains both successful and failed responses with metadata
 */
export interface AggregatorResult<T = unknown> {
  /** All responses from routers */
  results: RouterResponse<T>[];
  /** Only successful responses */
  successful: RouterResponse<T>[];
  /** Only failed responses */
  failed: RouterResponse<T>[];
  /** Total time taken for all requests (ms) */
  totalTime: number;
}