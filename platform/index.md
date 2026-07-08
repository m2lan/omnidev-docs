# OmniDev Platform

All-in-One AI development platform integrating IDE, Agent, RAG, Workflow, Deploy, and more.

## Overview

OmniDev Platform is a comprehensive AI development environment designed to streamline the entire development lifecycle. It combines multiple tools and services into a unified platform.

## Key Features

- **Integrated IDE** — Browser-based development environment
- **AI Agent** — Intelligent coding assistant with context awareness
- **RAG System** — Retrieval-Augmented Generation for code and documentation
- **Workflow Engine** — Visual workflow builder powered by Temporal
- **Deployment Pipeline** — One-click deployment to multiple environments
- **Team Collaboration** — Real-time collaboration tools

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Go 1.22+ / Gin / gRPC / Wire |
| Frontend | Next.js 15 / React 19 / Tailwind / Shadcn/ui |
| Database | PostgreSQL 16 + pgvector / Redis 7 / Kafka |
| Storage | MinIO (S3-compatible) |
| Search | Elasticsearch 8 |
| Workflow | Temporal |
| Infra | Docker / Kubernetes / Helm |
| Observability | Prometheus / Grafana / Loki / Jaeger |

## Quick Start

See [Getting Started](/platform/getting-started) for installation and setup instructions.

## Architecture

See [Architecture](/platform/architecture) for system design and component overview.
