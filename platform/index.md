# OmniDev Platform

**OmniDev — AI knowledge & coding workbench**: a team-oriented workbench for chat, retrieval-augmented knowledge, and background coding agents.

## Working Features

### Chat

- OpenAI, DeepSeek, Qwen, and Anthropic models, with streaming and non-streaming responses
- Conversation management, multimodal images, and image generation
- Attachments stored in MinIO and parsed with Apache Tika
- Per-user AI provider configurations (BYOK); keys are encrypted when `ENCRYPTION_KEY` is set
- External MCP tools over streamable HTTP

### Knowledge

- Knowledge bases, document upload and Tika parsing, and configurable chunk size/overlap
- OpenAI, Gemini, or Ollama embeddings with pgvector similarity search and Redis caching
- RAG context injected into chat
- Embedding dimensions are stored per knowledge base and follow its embedding model

The gateway embeds the `knowledge-engine` Go module. The same engine is also available separately as an HTTP API and MCP server.

### Background Agents

- User-defined agents with a system prompt, maximum steps, and selected tools
- Asynchronous, persistent runs with a plan → think/tool call/code execution → response loop
- Workspace file operations and search, calculator, and code execution tools
- Python, JavaScript/Node.js, Go, and shell execution in isolated, resource-limited Docker containers
- Run polling and cancellation through the real HTTP API

Pull-request delivery is planned, not implemented.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | One Go 1.22+ binary in `apps/gateway` (Gin) |
| Frontend | Next.js 15 / React 19 in `apps/web` |
| Data | PostgreSQL 16 + pgvector / Redis 7 |
| Files and parsing | MinIO / Apache Tika |
| Agent runtime | Throwaway Docker containers |

## Scope

OmniDev is a modular monolith, not a 16-microservice platform. It does not include an online IDE, visual workflow canvas, billing or subscriptions, one-click deployment, a notification service, or a bundled Prometheus/Grafana/Loki/Jaeger stack. Kafka, Elasticsearch, Temporal, Kubernetes, and Helm are not part of the current architecture.

See [Getting Started](/platform/getting-started), [Architecture](/platform/architecture), and [API Reference](/platform/api).
