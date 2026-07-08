# Project Overview

## OmniDev Ecosystem

The OmniDev ecosystem consists of multiple projects designed to work together or independently.

```
┌─────────────────────────────────────────────────────────────┐
│                    OmniDev Ecosystem                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐    ┌──────────────────┐               │
│  │  OmniDev Platform │    │ Knowledge Engine │               │
│  │                   │    │                  │               │
│  │  • IDE            │◄───│  • RAG           │               │
│  │  • Agent          │    │  • Search        │               │
│  │  • Workflow       │    │  • Embedding     │               │
│  │  • Deploy         │    │                  │               │
│  └──────────────────┘    └──────────────────┘               │
│                                                              │
│  ┌──────────────────┐    ┌──────────────────┐               │
│  │   Future Project  │    │   Future Project │               │
│  │        ...        │    │        ...       │               │
│  └──────────────────┘    └──────────────────┘               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Project Relationships

### OmniDev Platform + Knowledge Engine

The Platform integrates Knowledge Engine as its RAG backend:

- **Document Management** — Upload and manage documents via Platform UI
- **Search Integration** — Search results fed into AI Agent context
- **Shared Infrastructure** — Same PostgreSQL and Redis instances

### Standalone Usage

Each project can be used independently:

- **Knowledge Engine** — As a standalone RAG service for any application
- **Platform** — With custom RAG backend via API

## Technology Stack Comparison

| Component | Platform | Knowledge Engine |
|-----------|----------|------------------|
| Language | Go | Go |
| HTTP Framework | Gin | chi |
| Database | PostgreSQL + pgvector | PostgreSQL + pgvector |
| Cache | Redis | Redis |
| Storage | MinIO | Local / MinIO / S3 |
| Embedding | OpenAI / Custom | OpenAI / Gemini / Ollama |
| Frontend | Next.js | None (API only) |
| Workflow | Temporal | None |

## Use Cases

### Platform

- **AI-Powered Development** — IDE with AI assistance
- **Team Collaboration** — Shared workspaces and projects
- **Workflow Automation** — Visual workflow builder
- **One-Click Deploy** — Deploy to multiple environments

### Knowledge Engine

- **RAG Applications** — Provide context to LLMs
- **Document Search** — Full-text and semantic search
- **Chatbot Enhancement** — Ground responses in documents
- **Knowledge Management** — Organize and retrieve information
