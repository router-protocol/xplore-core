import type { RouterResponse } from './types';

/**
 * Utility functions for the Router Aggregator SDK
 */

/**
 * Get the fastest successful response
 */
export function getFastestResponse<T>(responses: RouterResponse<T>[]): RouterResponse<T> | null {
  const successful = responses.filter(r => r.success);
  if (successful.length === 0) return null;
  
  return successful.reduce((fastest, current) => 
    current.timestamp < fastest.timestamp ? current : fastest
  );
}

/**
 * Get the most recent response
 */
export function getLatestResponse<T>(responses: RouterResponse<T>[]): RouterResponse<T> | null {
  if (responses.length === 0) return null;
  
  return responses.reduce((latest, current) => 
    current.timestamp > latest.timestamp ? current : latest
  );
}

/**
 * Calculate success rate
 */
export function calculateSuccessRate(responses: RouterResponse[]): number {
  if (responses.length === 0) return 0;
  
  const successCount = responses.filter(r => r.success).length;
  return (successCount / responses.length) * 100;
}

/**
 * Group responses by router
 */
export function groupByRouter<T>(responses: RouterResponse<T>[]): Record<string, RouterResponse<T>[]> {
  return responses.reduce((groups, response) => {
    const { routerId } = response;
    if (!groups[routerId]) {
      groups[routerId] = [];
    }
    groups[routerId]!.push(response);
    return groups;
  }, {} as Record<string, RouterResponse<T>[]>);
}