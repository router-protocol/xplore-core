import { describe, it, expect } from 'vitest';
import { PremiumRouterAggregator } from './client';

describe('PremiumRouterAggregator', () => {
  it('should create an instance with default options', () => {
    const aggregator = new PremiumRouterAggregator({
      routers: [
        { id: 'router1', endpoint: 'https://api.example.com', name: 'Router 1' }
      ]
    });

    expect(aggregator).toBeInstanceOf(PremiumRouterAggregator);
  });
});