import type { AggregatorOptions, AggregatorResult, RouterConfig, RouterResponse } from './types';

/**
 * Router Aggregator Client
 */
export class PremiumRouterAggregator {
  private readonly routers: RouterConfig[];
  private readonly defaultTimeout: number;
  private readonly maxRetries: number;

  constructor(options: AggregatorOptions) {
    this.routers = options.routers;
    this.defaultTimeout = options.defaultTimeout ?? 5000;
    this.maxRetries = options.maxRetries ?? 4;
  }

  /**
   * Execute a request across all configured routers
   */
  async aggregate<T = unknown>(
    path: string,
    options?: RequestInit
  ): Promise<AggregatorResult<T>> {
    const startTime = Date.now();
    
    const promises = this.routers.map(router => 
      this.executeRequest<T>(router, path, options)
    );

    const results = await Promise.allSettled(promises);
    
    const responses: RouterResponse<T>[] = results.map((result, index) => {
      const routerId = this.routers[index]!.id;
      
      if (result.status === 'fulfilled') {
        return result.value;
      }
      
      return {
        success: false,
        error: result.reason instanceof Error ? result.reason.message : 'Unknown error',
        routerId,
        timestamp: Date.now(),
      };
    });

    const successful = responses.filter(r => r.success);
    const failed = responses.filter(r => !r.success);

    return {
      results: responses,
      successful,
      failed,
      totalTime: Date.now() - startTime,
    };
  }

  private async executeRequest<T>(
    router: RouterConfig,
    path: string,
    options?: RequestInit
  ): Promise<RouterResponse<T>> {
    const url = `${router.endpoint}${path}`;
    const timeout = router.timeout ?? this.defaultTimeout;
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      const data = await response.json() as T;
      
      if (response.ok) {
        return {
          success: true,
          data,
          routerId: router.id,
          timestamp: Date.now(),
        };
      }
      
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
        routerId: router.id,
        timestamp: Date.now(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Request failed',
        routerId: router.id,
        timestamp: Date.now(),
      };
    }
  }
}