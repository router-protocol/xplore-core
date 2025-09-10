# @routerprotocol/xplore-ui

A high-performance TypeScript SDK for router aggregation with parallel request handling and comprehensive response analysis.

[![CI](https://github.com/devaf/router-aggregator-ts-core/actions/workflows/ci.yml/badge.svg)](https://github.com/devaf/router-aggregator-ts-core/actions/workflows/ci.yml)
[![Release](https://github.com/devaf/router-aggregator-ts-core/actions/workflows/release.yml/badge.svg)](https://github.com/devaf/router-aggregator-ts-core/actions/workflows/release.yml)
[![npm version](https://badge.fury.io/js/@routerprotocol%2Fxplore-ui.svg)](https://badge.fury.io/js/@routerprotocol%2Fxplore-ui)

## ✨ Features

- 🚀 **Parallel Processing**: Execute requests to multiple router endpoints simultaneously
- 📊 **Response Analysis**: Built-in utilities for fastest response detection, success rates, and response grouping
- 🔧 **TypeScript First**: Strict TypeScript with `exactOptionalPropertyTypes` enabled
- ⚡ **High Performance**: Built with Bun and optimized for speed
- 🎯 **Flexible**: Generic type support for custom response types
- 📦 **Dual Output**: CommonJS and ESM support
- 🧪 **Well Tested**: Comprehensive test coverage with Node.js and Bun runtime testing

## 📦 Installation

```bash
# With npm
npm install @routerprotocol/xplore-ui

# With yarn
yarn add @routerprotocol/xplore-ui

# With pnpm
pnpm add @routerprotocol/xplore-ui

# With bun
bun add @routerprotocol/xplore-ui
```

## 🚀 Quick Start

```typescript
import { RouterAggregator } from '@routerprotocol/xplore-ui';

// Configure your routers
const routers = [
  { url: 'https://api-router-1.com/route', timeout: 5000 },
  { url: 'https://api-router-2.com/route', timeout: 3000 },
  { url: 'https://api-router-3.com/route', timeout: 4000 }
];

// Create aggregator instance
const aggregator = new RouterAggregator(routers);

// Execute parallel requests
const result = await aggregator.execute('/your-endpoint', {
  method: 'POST',
  body: { data: 'your-payload' }
});

// Analyze results
console.log('Successful responses:', result.successful.length);
console.log('Failed responses:', result.failed.length);
console.log('Fastest response time:', result.successful[0]?.timing.duration);
```

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
} from '@routerprotocol/xplore-ui';

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

## 🏗️ Development

### Prerequisites

- [Bun](https://bun.sh/) 1.1.0+
- Node.js 20+ (for compatibility testing)

### Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/router-aggregator-ts-core.git
cd router-aggregator-ts-core

# Install dependencies
bun install

# Run tests
bun run test

# Build the project
bun run build

# Run development mode
bun run dev
```

### Scripts

- `bun run build` - Build the SDK
- `bun run dev` - Build in watch mode
- `bun run test` - Run tests with vitest
- `bun run lint` - Run oxlint linter
- `bun run typecheck` - Run TypeScript type checking
- `bun run release` - Run semantic release

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
bun add @routerprotocol/xplore-ui@0.0.0-beta.pr-123.abc1234
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