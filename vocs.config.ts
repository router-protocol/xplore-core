import { defineConfig } from 'vocs'

export default defineConfig({
  title: 'Router Aggregator Core',
  description: 'TypeScript SDK for router aggregation with bridge and exchange support',
  logoUrl: {
    light: '/logo-light.svg',
    dark: '/logo-dark.svg',
  },
  iconUrl: '/favicon.ico',
  sidebar: [
    {
      text: 'Getting Started',
      items: [
        { text: 'Introduction', link: '/' },
        { text: 'Installation', link: '/installation' },
        { text: 'Quick Start', link: '/quick-start' },
      ],
    },
    {
      text: 'Core Concepts',
      items: [
        { text: 'Node Types', link: '/concepts/node-types' },
        { text: 'Bridges vs Exchanges', link: '/concepts/bridges-vs-exchanges' },
        { text: 'Chain Compatibility', link: '/concepts/chain-compatibility' },
      ],
    },
    {
      text: 'API Reference',
      items: [
        { text: 'Node Types', link: '/api/node-types' },
        { text: 'Node Constants', link: '/api/node-constants' },
        { text: 'Node Utilities', link: '/api/node-utilities' },
        { text: 'Router Types', link: '/api/router-types' },
      ],
    },
    {
      text: 'Examples',
      items: [
        { text: 'Basic Usage', link: '/examples/basic-usage' },
        { text: 'Bridge Operations', link: '/examples/bridge-operations' },
        { text: 'Exchange Operations', link: '/examples/exchange-operations' },
        { text: 'Advanced Filtering', link: '/examples/advanced-filtering' },
      ],
    },
  ],
  socials: [
    {
      icon: 'github',
      link: 'https://github.com/router-protocol/router-aggregator-ts-core',
    },
  ],
  theme: {
    accentColor: '#007acc',
  },
  editLink: {
    pattern: 'https://github.com/router-protocol/router-aggregator-ts-core/edit/main/docs/pages/:path',
    text: 'Edit on GitHub'
  },
})