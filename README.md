# Router Aggregator Core

[![Documentation](https://img.shields.io/badge/docs-available-brightgreen)](https://router-protocol.github.io/xplore-core/)
[![CI](https://github.com/router-protocol/xplore-core/actions/workflows/ci.yml/badge.svg)](https://github.com/router-protocol/xplore-core/actions/workflows/ci.yml)
[![Release](https://github.com/router-protocol/xplore-core/actions/workflows/release.yml/badge.svg)](https://github.com/router-protocol/xplore-core/actions/workflows/release.yml)
[![npm version](https://badge.fury.io/js/@routerprotocol%2Fxplore-core.svg)](https://badge.fury.io/js/@routerprotocol%2Fxplore-core)

A TypeScript SDK for router aggregation with comprehensive support for cross-chain bridges and decentralized exchange aggregators.

## Overview

Router Aggregator Core provides a unified interface for interacting with multiple routing protocols, categorizing them into two distinct types:

- **Bridges**: Cross-chain protocols that facilitate token transfers between different blockchains
- **Exchanges**: DEX aggregators that find optimal trading routes within and across chains

## Key Features

- **Type-Safe Node Classification**: Clear distinction between bridge and exchange nodes with TypeScript support
- **Comprehensive Protocol Support**: Support for 9+ major protocols including Relay, deBridge, Across, OpenOcean, and more
- **Chain Compatibility**: Built-in compatibility mappings for different blockchain types
- **Utility Functions**: Rich set of helper functions for node categorization and filtering
- **Modern TypeScript**: Built with strict TypeScript and modern tooling

## 📦 Installation

```bash
# With npm
npm install @routerprotocol/xplore-core

# With yarn
yarn add @routerprotocol/xplore-core

# With pnpm
pnpm add @routerprotocol/xplore-core

# With bun
bun add @routerprotocol/xplore-core
```

## Quick Start

```typescript
import { BridgeNodes, ExchangeNodes, isBridgeNode, isExchangeNode } from '@routerprotocol/xplore-core'

// Type-safe node classification
const relay = BridgeNodes.RELAY
const openocean = ExchangeNodes.OPENOCEAN

// Runtime type checking
console.log(isBridgeNode(relay))         // true
console.log(isExchangeNode(relay))       // false
console.log(isExchangeNode(openocean))   // true
```

## Supported Protocols

### Bridges
- **Relay**: Multi-chain bridge supporting EVM, Solana, Sui, and Bitcoin
- **deBridge**: Cross-chain liquidity protocol
- **Across**: Optimistic cross-chain bridge
- **THORChain**: Native cross-chain liquidity protocol supporting Bitcoin
- **Stargate Taxi**: Cross-chain bridge using LayerZero
- **Mayan CCTP**: Protocol using Circle's Cross-Chain Transfer Protocol
- **Mayan Swift**: Fast bridging solution from Mayan
- **GasZip**: Native token bridge for gas fee optimization

### Exchanges
- **OpenOcean**: DEX aggregator with cross-chain capabilities

## Documentation

Complete documentation is available at: **https://router-protocol.github.io/xplore-core/**

- [Installation Guide](https://router-protocol.github.io/xplore-core/installation)
- [Quick Start](https://router-protocol.github.io/xplore-core/quick-start)
- [API Reference](https://router-protocol.github.io/xplore-core/api/node-types)
- [Examples](https://router-protocol.github.io/xplore-core/examples/basic-usage)

## 📚 API Reference

### RouterAggregator

The main class for handling parallel router requests.

#### Constructor

```typescript
new RouterAggregator<T>(configs: RouterConfig[], options?: AggregatorOptions)
```

- `configs`: Array of router configurations
- `options`: Optional aggregator settings

#### Methods

##### execute(endpoint, requestOptions)

Execute requests to all configured routers in parallel.

```typescript
async execute(endpoint: string, options?: RequestOptions): Promise<AggregatorResult<T>>
```

Returns an `AggregatorResult` with:
- `successful`: Array of successful responses with timing information
- `failed`: Array of failed responses with error details
- `metadata`: Execution metadata and statistics

### Types

#### RouterConfig

```typescript
interface RouterConfig {
  url: string;          // Base router URL
  timeout?: number;     // Request timeout in milliseconds
  headers?: Record<string, string>; // Custom headers
}
```

#### AggregatorResult

```typescript
interface AggregatorResult<T> {
  successful: RouterResponse<T>[];
  failed: RouterResponse<never>[];
  metadata: {
    totalRequests: number;
    successRate: number;
    averageResponseTime: number;
  };
}
```

#### RouterResponse

```typescript
interface RouterResponse<T> {
  routerUrl: string;
  data: T;
  timing: {
    start: number;
    end: number;
    duration: number;
  };
  status: 'success' | 'error';
  error?: string;
}
```

## 🛠️ Utilities

The SDK includes helper utilities for response analysis:

```typescript
import { 
  getFastestResponse, 
  getSuccessRate, 
  groupResponsesByStatus 
} from '@routerprotocol/xplore-core';

const result = await aggregator.execute('/endpoint');

// Get the fastest successful response
const fastest = getFastestResponse(result.successful);

// Calculate success rate
const successRate = getSuccessRate(result);

// Group responses by status
const grouped = groupResponsesByStatus(result);
```

## 🔧 Configuration

### Router Configuration

```typescript
const routers = [
  {
    url: 'https://primary-router.com',
    timeout: 5000,
    headers: {
      'Authorization': 'Bearer token',
      'X-API-Key': 'your-key'
    }
  },
  {
    url: 'https://fallback-router.com',
    timeout: 3000
  }
];
```

### Aggregator Options

```typescript
const options = {
  maxConcurrency: 10,     // Maximum concurrent requests
  retries: 2,             // Number of retries on failure
  retryDelay: 1000       // Delay between retries (ms)
};

const aggregator = new RouterAggregator(routers, options);
```

## Development

```bash
# Install dependencies
bun install

# Build the package
bun run build

# Run tests
bun run test

# Type checking
bun run typecheck

# Linting
bun run lint

# Documentation development
bun run docs:dev

# Build documentation
bun run docs:build
```

## 🧪 Testing

The project includes comprehensive testing with both Node.js and Bun runtime:

```bash
# Run tests with vitest (Node.js)
bun run test

# Run tests with Bun test runner
bun test
```

## 🚀 CI/CD

This project uses GitHub Actions for continuous integration and deployment:

- **CI Pipeline**: Multi-version testing (Node 20+, Bun latest/1.1.0)
- **Semantic Releases**: Automated versioning and publishing
- **Beta Releases**: PR-based beta deployments to GitHub Packages
- **Dual Publishing**: NPM + GitHub Packages
- **Dependency Updates**: Automated via Dependabot

### Beta Testing

When you create a pull request, a beta version is automatically published:

```bash
# Install beta version (from PR comment)
bun add @routerprotocol/xplore-core@0.0.0-beta.pr-123.abc1234
```

## 📄 License

ISC

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following conventional commits
4. Run tests and ensure they pass
5. Submit a pull request

### Conventional Commits

This project uses semantic release with conventional commits:

- `feat:` - New features (minor version bump)
- `fix:` - Bug fixes (patch version bump)
- `docs:` - Documentation changes (patch version bump)
- `chore:` - Maintenance tasks (no version bump)
- `BREAKING CHANGE:` - Breaking changes (major version bump)

## 📈 Performance

Built for high performance with:

- Parallel request execution using `Promise.allSettled()`
- Efficient memory usage with streaming responses
- Optimized TypeScript compilation with `tsup`
- Bundle size monitoring and analysis
- Native Bun performance optimizations

## 🔍 Monitoring

The CI pipeline includes:

- Bundle size analysis
- Performance benchmarking
- Memory usage tracking
- Multi-runtime compatibility testing

---

Built with ❤️ using [Bun](https://bun.sh/) and [TypeScript](https://www.typescriptlang.org/)