# GitHub Actions Setup Guide

This project includes a comprehensive CI/CD pipeline with automated releases, publishing, and dependency management.

## 🔧 Required Secrets

To enable all workflows, configure these secrets in your repository settings:

### For NPM Publishing
- `NPM_TOKEN` - NPM registry authentication token
  - Create at: https://www.npmjs.com/settings/tokens
  - Type: Automation token

### Auto-provided Tokens
- `GITHUB_TOKEN` - Automatically provided by GitHub Actions

## 📋 Workflows Overview

### 1. CI Pipeline (`ci.yml`)
**Triggers**: Push to `main`/`develop`, Pull Requests
**Features**:
- Multi-version Node.js testing (20, 22)
- Multi-version Bun runtime testing (latest, 1.1.0)
- Type checking with TypeScript
- Code linting with oxlint
- Test execution with vitest and Bun test
- Build verification
- Bundle size analysis (PR only)

### 2. Release (`release.yml`)
**Triggers**: Push to `main` branch
**Features**:
- Semantic versioning with conventional commits
- Automated changelog generation
- NPM package publishing
- GitHub release creation
- Skip CI on release commits

### 3. Beta Release (`beta-release.yml`)
**Triggers**: Pull Requests to `main` branch
**Features**:
- Publishes beta versions to GitHub Packages
- Automatic versioning with PR number and commit SHA
- PR comments with installation instructions
- Available for testing before merge

### 4. NPM Dual Publishing (`npm-publish.yml`)
**Triggers**: GitHub release published
**Features**:
- Publishes to NPM registry
- Publishes to GitHub Packages
- Dual registry support

### 5. Dependabot (`dependabot.yml`)
**Features**:
- Weekly dependency updates
- Grouped minor/patch updates
- Separate major version updates
- GitHub Actions updates

## 🚀 Deployment Strategy: Library/Package Publishing

This project follows **Pattern 1: Library/Package Publishing** from the CLAUDE.md guide:

- ✅ Semantic release with conventional commits
- ✅ Dual NPM + GitHub Packages publishing  
- ✅ Automated changelog generation
- ✅ Version management across releases
- ✅ Beta releases on pull requests
- ✅ Bundle size monitoring
- ✅ Automated dependency updates

## 📝 Conventional Commit Standards

For semantic release to work properly, use these commit message formats:

```
feat: add new router aggregation feature          # → minor version bump
fix: resolve timeout handling bug                 # → patch version bump  
docs: update API documentation                    # → patch version bump
chore: update dependencies                        # → no version bump
BREAKING CHANGE: remove deprecated method         # → major version bump
```

## 🔄 Release Process

1. **Develop**: Create feature branches, make changes
2. **Pull Request**: CI runs automatically, beta version published to GitHub Packages
3. **Testing**: Install and test beta version from PR comment
4. **Merge to main**: Semantic release analyzes commits
5. **Automatic Release**: Version bump, changelog, NPM publish, GitHub release

## 🏗️ Project Requirements Analysis

This setup addresses the following requirements:

**✅ Language & Build Requirements:**
- TypeScript with strict configuration
- Bun as package manager and runtime
- tsup for dual CJS/ESM output
- Node.js target environment

**✅ Testing & Quality Requirements:**
- vitest testing framework
- Bun native test runner
- oxlint for fast linting
- TypeScript type checking
- Multi-Node version testing (20, 22)
- Multi-Bun version testing (latest, 1.1.0)

**✅ Deployment Requirements:**
- NPM registry publishing
- GitHub Packages publishing
- Semantic versioning
- Automated releases

**✅ Security & Maintenance:**
- Dependabot for automated updates
- Grouped dependency updates
- Security-focused release process

## 🛠️ Setup Checklist

- [x] `.github/workflows/` - All workflow files created
- [x] `.releaserc.json` - Semantic release configuration
- [x] `.github/dependabot.yml` - Dependency automation
- [x] Issue and PR templates
- [x] Package.json scripts updated
- [x] Semantic release dependencies added

## 📊 Performance Monitoring

- Bundle size analysis on PRs
- Build time tracking
- Multi-version compatibility testing
- Automated security audits

## 🔐 Security Features

- Dependency vulnerability scanning
- Automated security updates
- Token-based authentication
- Minimal permission scopes
- Provenance attestations

## 📚 Next Steps

1. **Configure Secrets**: Add `NPM_TOKEN` to repository secrets
2. **First Release**: Push conventional commit to `main` branch
3. **Monitor**: Check GitHub Actions tab for workflow execution
4. **Customize**: Adjust workflows as needed for your specific requirements

For more detailed information, see the comprehensive guide in `CLAUDE.md`.