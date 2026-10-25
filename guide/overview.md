# Project Overview

## Two Repositories, One Integrated Workbench

OmniDev uses the Knowledge Engine as an embedded Go module rather than a separate platform microservice.

```text
┌──────────────────────── OmniDev ────────────────────────┐
│ Next.js web UI                                          │
│ Go gateway: auth · users · chat · knowledge · agents    │
│                    │                                    │
│                    └── embedded knowledge-engine module │
└────────────────────────┬────────────────────────────────┘
                         │
       PostgreSQL + pgvector · Redis · MinIO · Tika · Docker
```

The repositories must be cloned side by side because `apps/gateway/go.mod` uses a local `replace` for `knowledge-engine`. Knowledge Engine also has its own standalone HTTP API and MCP server for other applications.

## Project Roles

| Component | OmniDev | Knowledge Engine |
|-----------|---------|------------------|
| Primary role | Team AI knowledge & coding workbench | Embeddable or standalone RAG engine |
| Backend | One Go/Gin gateway | Go HTTP API and MCP server |
| Frontend | Next.js 15 / React 19 | None |
| Data | PostgreSQL + pgvector, Redis | PostgreSQL + pgvector, optional Redis cache |
| Documents | MinIO attachments, local or MinIO knowledge storage | Configurable document storage and Tika parsing |
| AI | Multi-model chat, embeddings, background agent planner | OpenAI, Gemini, and Ollama embeddings |
| Execution | Sandboxed background agents | No agent runtime |

## Current Use Cases

### OmniDev

- **Multi-model chat** — Streaming conversations, attachments, images, BYOK, and external MCP tools
- **Grounded answers** — Upload documents and inject pgvector retrieval results into chat
- **Background tasks** — Run user-defined agents with workspace tools and isolated code execution

### Knowledge Engine

- **RAG applications** — Provide document context to LLM applications
- **Semantic search** — Search knowledge bases with pgvector
- **MCP tools** — Expose knowledge operations to MCP clients
- **Document management** — Parse, chunk, embed, and retrieve documents

## Product Boundaries

OmniDev does not currently provide an online IDE, visual workflows, billing, one-click deployment, or a bundled monitoring stack. Agent-created pull requests are planned but not implemented. There is no Kafka, Elasticsearch, Temporal, or 16-microservice deployment.
