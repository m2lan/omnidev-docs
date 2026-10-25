# Guide

Welcome to the documentation for **OmniDev — AI knowledge & coding workbench**.

## OmniDev Platform

A modular monolith for multi-model chat, document-grounded knowledge, and sandboxed background agents.

- [Overview](/platform/) — Current features and product boundaries
- [Getting Started](/platform/getting-started) — Local setup and checks
- [Architecture](/platform/architecture) — Gateway, embedded knowledge engine, and agent sandboxes
- [Configuration](/platform/configuration) — Environment variables
- [Deployment](/platform/deployment) — Docker Compose deployment
- [API Reference](/platform/api) — Chat, knowledge, and agent HTTP APIs

## Knowledge Engine

The RAG module embedded in OmniDev, also available independently as an HTTP API and MCP server.

- [Overview](/knowledge-engine/) — Engine features and capabilities
- [Getting Started](/knowledge-engine/getting-started) — Standalone installation and setup
- [Configuration](/knowledge-engine/configuration) — Environment variables
- [MCP Server](/knowledge-engine/mcp) — MCP integration
- [Adapters](/knowledge-engine/adapters) — Pluggable adapters
- [Deployment](/knowledge-engine/deployment) — Standalone Docker deployment

## First Steps

For the complete workbench, clone `omnidev` and `knowledge-engine` side by side, then follow [Getting Started](/platform/getting-started). Use the standalone Knowledge Engine guide only when you want the engine without the OmniDev gateway and web UI.
