# Architecture

## System Overview

OmniDev Platform follows a microservices architecture with the following major components:

```
┌─────────────────────────────────────────────────┐
│                   Frontend                       │
│              (Next.js / React)                   │
└─────────────────────┬───────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────┐
│                  Gateway                         │
│        (Go / Gin) + knowledge-engine (lib)       │
└──┬──────────┬──────────┬──────────┬─────────────┘
   │          │          │          │
   ▼          ▼          ▼          ▼
┌──────┐ ┌──────┐ ┌──────┐ ┌──────────┐
│ Chat │ │ Auth │ │Knowledge│ │ Workflow │
│ Svc  │ │ Svc  │ │  Engine │ │(Temporal)│
└──────┘ └──────┘ └────────┘ └──────────┘
      │                ▲
      └── MCP / HTTP ──┘
```

## Key Components

### Gateway
- HTTP API server
- Request routing and middleware
- Authentication and authorization
- Embeds the shared `knowledge-engine` module for `/api/v1/knowledge` and RAG context; there is no
  second RAG implementation to keep in sync.

### Chat Service
- LLM provider integration
- Conversation management
- Streaming responses
- Calls external MCP servers (for example `knowledge-engine` at `POST /mcp`) and runs tool-call rounds

### Knowledge Engine
- Document ingestion with Tika parsing
- Embedding generation and pgvector storage
- Hybrid (vector + full-text) search
- Exposed as both a REST API and an MCP server (HTTP and stdio)

### Workflow Engine
- Visual workflow builder
- Task orchestration via Temporal
- Event-driven execution

## Data Flow

1. User sends request via Frontend
2. Gateway authenticates and routes to appropriate service
3. Service processes request and returns response
4. Real-time updates via WebSocket or SSE
