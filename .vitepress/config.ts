import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'OmniDev',
  description: 'OmniDev AI Platform Documentation Hub',
  lang: 'en',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'og:url', content: 'https://docs.zhigupu.com' }],
  ],

  cleanUrls: true,

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Projects',
        items: [
          { text: 'OmniDev Platform', link: '/platform/' },
          { text: 'Knowledge Engine', link: '/knowledge-engine/' },
        ],
      },
      { text: 'Guide', link: '/guide/' },
    ],

    sidebar: {
      '/platform/': [
        {
          text: 'OmniDev Platform',
          items: [
            { text: 'Overview', link: '/platform/' },
            { text: 'Getting Started', link: '/platform/getting-started' },
            { text: 'Architecture', link: '/platform/architecture' },
            { text: 'Configuration', link: '/platform/configuration' },
            { text: 'Deployment', link: '/platform/deployment' },
            { text: 'API Reference', link: '/platform/api' },
          ],
        },
      ],
      '/knowledge-engine/': [
        {
          text: 'Knowledge Engine',
          items: [
            { text: 'Overview', link: '/knowledge-engine/' },
            { text: 'Getting Started', link: '/knowledge-engine/getting-started' },
            { text: 'Configuration', link: '/knowledge-engine/configuration' },
            { text: 'Adapters', link: '/knowledge-engine/adapters' },
            { text: 'Deployment', link: '/knowledge-engine/deployment' },
          ],
        },
      ],
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Project Overview', link: '/guide/overview' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/m2lan' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present OmniDev',
    },

    search: {
      provider: 'local',
    },

    outline: {
      level: [2, 3],
      label: 'On this page',
    },
  },
})
