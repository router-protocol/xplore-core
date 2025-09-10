import { describe, it, expect } from 'vitest';
import { RouterAggregator } from './client';

describe('RouterAggregator', () => {
  it('should create an instance with default options', () => {
    const aggregator = new RouterAggregator({
      routers: [
        { id: 'router1', endpoint: 'https://api.example.com', name: 'Router 1' }
      ]
    });

    expect(aggregator).toBeInstanceOf(RouterAggregator);
  });
});