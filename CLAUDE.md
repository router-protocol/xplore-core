# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is a Bun TypeScript SDK template. Common commands:

- `bun install` - Install dependencies
- `bun run build` - Build the SDK (outputs to `dist/`)
- `bun run dev` - Build in watch mode for development
- `bun run lint` - Run oxlint linter
- `bun run typecheck` - Run TypeScript type checking
- `bun run test` - Run tests with vitest

## Architecture

This is a TypeScript SDK template for router aggregation with the following structure:

- **Core exports**: `src/index.ts` - Main entry point that exports all public APIs
- **Type definitions**: `src/types.ts` - Central type definitions including `RouterConfig`, `AggregatorOptions`, `RouterResponse`, and `AggregatorResult`
- **Main client**: `src/client.ts` - `RouterAggregator` class that handles parallel requests to multiple router endpoints
- **Utilities**: `src/utils.ts` - Helper functions for response analysis (fastest response, success rates, grouping)

## Key Design Patterns

- Uses strict TypeScript with `exactOptionalPropertyTypes` enabled
- Built with tsup for dual CJS/ESM output
- oxlint for fast linting instead of ESLint
- The `RouterAggregator` class executes requests in parallel using `Promise.allSettled()` and provides both successful and failed response categorization
- All router responses include timing information and are typed generically for flexibility

## Usage Guide

### 1. Project Requirements Analysis

Before setting up workflows, analyze project requirements:

**Language & Build Requirements:**
- [ ] TypeScript version and configuration needs
- [ ] Build tool preference (tsup, rollup, webpack, vite)
- [ ] Output formats required (CJS, ESM, UMD)
- [ ] Browser vs Node.js target environment

**Testing & Quality Requirements:**
- [ ] Testing framework (vitest, jest, playwright)
- [ ] Code coverage requirements
- [ ] Linting strategy (oxlint, eslint)
- [ ] Type checking approach

**Deployment Requirements:**
- [ ] NPM registry publishing needs
- [ ] Container deployment requirements
- [ ] Environment-specific builds
- [ ] Security scanning requirements

**Common Project Patterns:**
- **Libraries/Packages**: Focus on dual publishing (NPM + GitHub), semantic versioning
- **Backend Services**: Emphasize Docker publishing, security scanning, health checks
- **Frontend Applications**: Bundle analysis, Lighthouse audits, CDN deployment
- **Full-Stack Applications**: Multi-service deployment, environment management

### 2. Advanced Deployment Workflows

**Semantic Release - Automated Versioning:**
```yaml
# Required package.json scripts:
"release": "semantic-release"

# GitHub secrets needed:
# - NPM_TOKEN
# - GITHUB_TOKEN (auto-provided)
```

**NPM Publishing - Dual Registry:**
```yaml
# Publishes to both NPM and GitHub Packages
# Required secrets:
# - NPM_TOKEN
# - GITHUB_TOKEN
```

**Docker Publishing to GHCR:**
```yaml
# Container registry with attestations
# Automatic vulnerability scanning
# Multi-platform builds (linux/amd64, linux/arm64)
```

**Multi-Registry Docker:**
```yaml
# Publishes to multiple registries simultaneously
# Required secrets per registry:
# - DOCKER_USERNAME, DOCKER_PASSWORD
# - Additional registry credentials
```

**Automated Dependency Updates:**
```yaml
# Smart dependency management with Renovate/Dependabot
# Automated security updates
# Grouped updates by type (major, minor, patch)
```

**Performance Monitoring:**
```yaml
# Bundle analysis for size tracking
# Lighthouse audits for web performance
# Build time optimization metrics
```

### 3. Secrets and Environment Setup

**Required Tokens by Deployment Type:**

**NPM Publishing:**
- `NPM_TOKEN` - NPM registry authentication
- `GITHUB_TOKEN` - GitHub Packages (auto-provided)

**Docker Publishing:**
- `DOCKER_USERNAME` - Docker Hub username
- `DOCKER_PASSWORD` - Docker Hub token
- `GHCR_TOKEN` - GitHub Container Registry (use GITHUB_TOKEN)

**Security Scanning:**
- `SNYK_TOKEN` - Snyk vulnerability scanning
- `CODECOV_TOKEN` - Code coverage reporting

**Package.json Script Requirements:**
```json
{
  "scripts": {
    "build": "tsup",
    "test": "vitest",
    "lint": "oxlint .",
    "typecheck": "tsc --noEmit",
    "release": "semantic-release",
    "prepublishOnly": "bun run build"
  }
}
```

### 4. Deployment Strategy Patterns

**Pattern 1: Library/Package Publishing**
- Semantic release with conventional commits
- Dual NPM + GitHub Packages publishing
- Automated changelog generation
- Version management across releases

**Pattern 2: Containerized Applications**
- Multi-stage Docker builds
- Security scanning with Trivy/Snyk
- Multi-platform container builds
- Registry publishing with attestations

**Pattern 3: Frontend Applications**
- Bundle size analysis and tracking
- Lighthouse performance audits
- CDN deployment with cache optimization
- Progressive Web App validation

**Pattern 4: Full-Stack Applications**
- Microservice deployment coordination
- Environment-specific configuration
- Database migration management
- Service health monitoring

### 5. Workflow Selection Guide

**Decision Matrix:**

| Project Type | Core Workflows | Optional Workflows |
|--------------|---------------|-------------------|
| TypeScript Library | NPM Publishing, Semantic Release | Docker, Performance |
| Backend API | Docker Publishing, Security Scan | NPM, Lighthouse |
| Frontend App | Build & Deploy, Lighthouse | NPM, Docker |
| Full-Stack | All deployment types | Performance, Security |

**Technology-Specific Recommendations:**
- **Bun projects**: Use bun install with native performance
- **TypeScript**: Enable strict type checking in CI
- **Docker**: Multi-stage builds for optimization
- **Monorepos**: Selective workflow triggering

### 6. Best Practices

**Conventional Commit Standards:**
```
feat: add new router aggregation feature
fix: resolve timeout handling bug
docs: update API documentation
chore: update dependencies
```

**Workflow Optimization:**
- Use workflow concurrency groups to prevent conflicts
- Cache dependencies between workflow runs
- Parallelize independent jobs (build, test, lint)
- Use matrix strategies for multi-environment testing

**Security Considerations:**
- Never commit secrets or API keys
- Use GitHub Environments for deployment protection
- Enable security scanning for dependencies
- Implement proper secret rotation policies

**Performance Optimization:**
- Monitor bundle size changes in PRs
- Set performance budgets for builds
- Use incremental builds when possible
- Optimize Docker layer caching
