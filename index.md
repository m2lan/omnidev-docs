---
layout: home

head:
  - - script
    - {}
    - |
      if (typeof window !== 'undefined') {
        const lang = navigator.language || navigator.userLanguage
        if (lang.startsWith('zh') && !window.location.pathname.startsWith('/zh')) {
          window.location.href = '/zh/'
        }
      }

hero:
  name: OmniDev
  text: AI Knowledge & Coding Workbench
  tagline: Documentation for multi-model chat, RAG knowledge, and sandboxed background agents
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: View Platform
      link: /platform/

features:
  - icon: 🚀
    title: OmniDev Platform
    details: A modular monolith for multi-model chat, document-grounded knowledge, and background coding agents.
    link: /platform/
  - icon: 🧠
    title: Knowledge Engine
    details: Embedded in OmniDev or available standalone as an HTTP API and MCP server.
    link: /knowledge-engine/
  - icon: 📖
    title: Practical Guides
    details: Current setup, configuration, Docker Compose deployment, and real HTTP API references.
    link: /guide/
---

## Projects

<div class="projects-grid">

### OmniDev Platform
An AI knowledge & coding workbench for teams, with chat, RAG, and isolated background agents.

[Learn more →](/platform/)

### Knowledge Engine
The embedded knowledge module, also available independently for RAG applications and MCP clients.

[Learn more →](/knowledge-engine/)

</div>
