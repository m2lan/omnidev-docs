# Knowledge Engine

A pluggable, embeddable knowledge engine for document ingestion, chunking, embedding, and hybrid search.

## Overview

Knowledge Engine is a standalone service designed to be integrated into any project. It provides comprehensive RAG (Retrieval-Augmented Generation) capabilities with support for multiple formats, embedding providers, and storage backends.

## Key Features

- **Hybrid Search** — Vector similarity (pgvector) + BM25 full-text search, merged via Reciprocal Rank Fusion (RRF)
- **Chinese Support** — Runtime zhparser detection for Chinese full-text search
- **Multi-format Parsing** — PDF, DOCX, PPTX, XLSX, CSV, HTML, JSON, and source code
- **Pluggable Embedding** — OpenAI, Gemini, Ollama (OpenAI-compatible)
- **Pluggable Storage** — Local filesystem, MinIO/S3
- **Pluggable Auth** — JWT, no-op (development)
- **Industry Templates** — Configurable metadata schemas per industry
- **RBAC Permissions** — User, team, and organization-level access control

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Knowledge Engine                        │
├─────────────┬─────────────┬──────────────┬──────────────────┤
│  Transport  │   Service   │   Internal   │    Adapters      │
│             │             │              │                  │
│  HTTP (chi) │  KB Service │  Chunker     │  DB: PostgreSQL  │
│  gRPC (WIP) │  Search Svc │  Parser      │  Cache: Redis    │
│  SDK (Go)   │  Perm Svc   │  Embedder    │  Storage: MinIO  │
│             │             │  Retriever   │  Auth: JWT       │
├─────────────┴─────────────┴──────────────┴──────────────────┤
│                       Domain Layer                           │
│  KnowledgeBase · Document · Chunk · Permission · Template    │
└─────────────────────────────────────────────────────────────┘
```

## Use Cases

- **RAG Applications** — Provide context to LLMs from your own documents
- **Document Search** — Full-text and semantic search across document collections
- **Knowledge Management** — Organize and retrieve information from multiple sources
- **Chatbot Enhancement** — Ground chatbot responses in factual documents

## Quick Start

See [Getting Started](/knowledge-engine/getting-started) for installation and setup instructions.
