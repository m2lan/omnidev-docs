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
│              (Go / Gin / gRPC)                   │
└──┬──────────┬──────────┬──────────┬─────────────┘
   │          │          │          │
   ▼          ▼          ▼          ▼
┌──────┐ ┌──────┐ ┌──────┐ ┌──────────┐
│ Chat │ │ RAG  │ │ Auth │ │ Workflow │
│Svc   │ │Svc   │ │Svc   │ │  (Temporal)│
└──────┘ └──────┘ └──────┘ └──────────┘
```

## Key Components

### Gateway
- HTTP API server
- Request routing and middleware
- Authentication and authorization

### Chat Service
- LLM provider integration
- Conversation management
- Streaming responses

### RAG Service
- Document ingestion
- Embedding generation
- Vector search

### Workflow Engine
- Visual workflow builder
- Task orchestration via Temporal
- Event-driven execution

## Data Flow

1. User sends request via Frontend
2. Gateway authenticates and routes to appropriate service
3. Service processes request and returns response
4. Real-time updates via WebSocket or SSE
