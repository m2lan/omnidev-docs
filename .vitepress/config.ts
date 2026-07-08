import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'OmniDev',
  description: 'OmniDev AI Platform Documentation Hub',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'og:url', content: 'https://docs.zhigupu.com' }],
  ],

  cleanUrls: true,

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
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

        outline: {
          level: [2, 3],
          label: 'On this page',
        },
      },
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          {
            text: '项目',
            items: [
              { text: 'OmniDev 平台', link: '/zh/platform/' },
              { text: '知识引擎', link: '/zh/knowledge-engine/' },
            ],
          },
          { text: '指南', link: '/zh/guide/' },
        ],

        sidebar: {
          '/zh/platform/': [
            {
              text: 'OmniDev 平台',
              items: [
                { text: '概述', link: '/zh/platform/' },
                { text: '快速开始', link: '/zh/platform/getting-started' },
                { text: '架构设计', link: '/zh/platform/architecture' },
                { text: '配置说明', link: '/zh/platform/configuration' },
                { text: '部署指南', link: '/zh/platform/deployment' },
                { text: 'API 参考', link: '/zh/platform/api' },
              ],
            },
          ],
          '/zh/knowledge-engine/': [
            {
              text: '知识引擎',
              items: [
                { text: '概述', link: '/zh/knowledge-engine/' },
                { text: '快速开始', link: '/zh/knowledge-engine/getting-started' },
                { text: '配置说明', link: '/zh/knowledge-engine/configuration' },
                { text: '适配器', link: '/zh/knowledge-engine/adapters' },
                { text: '部署指南', link: '/zh/knowledge-engine/deployment' },
              ],
            },
          ],
          '/zh/guide/': [
            {
              text: '指南',
              items: [
                { text: '介绍', link: '/zh/guide/' },
                { text: '项目概览', link: '/zh/guide/overview' },
              ],
            },
          ],
        },

        outline: {
          level: [2, 3],
          label: '页面导航',
        },
      },
    },
  },

  themeConfig: {
    logo: '/logo.svg',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/m2lan' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026-present OmniDev',
    },

    search: {
      provider: 'local',
    },
  },
})
