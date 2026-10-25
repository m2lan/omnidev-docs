# Architecture

## Modular Monolith

OmniDev has one backend binary, `apps/gateway`, containing auth, users, chat, knowledge, and agent modules. It is not deployed as separate microservices.

```text
Next.js 15 / React 19 (apps/web)
              │ HTTP / SSE
              ▼
Go gateway (apps/gateway)
  auth · users · chat · knowledge · agent
              │
              ├── PostgreSQL 16 + pgvector
              ├── Redis 7
              ├── MinIO and Apache Tika
              ├── external MCP servers (streamable HTTP)
              └── Docker daemon (agent sandboxes)
```

Shared backend code lives in `packages/go-common`. The gateway imports the sibling `knowledge-engine` Go module through a local `replace`, which is why both repositories must be cloned side by side. Knowledge Engine can also run independently from its own repository as an HTTP API and MCP server.

## Chat

The chat module supports OpenAI, DeepSeek, Qwen, and Anthropic, streaming and non-streaming responses, conversations, multimodal images, and image generation. Attachments use MinIO storage and Tika parsing. Users can configure their own providers (BYOK); provider keys are encrypted when `ENCRYPTION_KEY` is configured.

With `MCP_ENABLED=true`, the gateway connects to external MCP servers using JSON-RPC 2.0 over streamable HTTP (`initialize`, `tools/list`, and `tools/call`). Chat allows at most five tool rounds, truncates tool output to 8000 runes, and records tool names in message metadata as `tools_used`.

Function calling currently works with the OpenAI-compatible adapters (OpenAI, DeepSeek, and Qwen). The Anthropic adapter does not yet map `tool_use`/`tool_result` blocks, so MCP tools are not offered to Anthropic models.

## Knowledge

The embedded engine provides knowledge bases, Tika document parsing, configurable chunk size and overlap, embeddings, pgvector similarity search, Redis caching, and RAG context injection into chat. Embedding providers are OpenAI, Gemini, and Ollama. Vector dimensions are per knowledge base and follow the selected embedding model; there is no global 768/1536-dimension restriction.

## Background Agents

Agents are user-defined with a name, description, system prompt, maximum steps, and tool selection. Runs execute asynchronously and persist `agents`, `agent_runs`, and `agent_steps` in PostgreSQL. The execution loop plans, then performs thinking, tool calls, or code execution before producing a response.

Available tools are workspace file read/write/list/delete, workspace search, calculator, and code execution. Code runs in a throwaway Docker container with:

- the run workspace mounted at `/workspace`
- `--network none`, a read-only root filesystem, and tmpfs `/tmp`
- all capabilities dropped and `no-new-privileges`
- CPU, memory, and PID limits
- a 120-second default timeout and stdout/stderr capped at 1 MiB

Supported languages are Python, JavaScript/Node.js, Go, and shell. Runs can be polled and cancelled. Agent routes are registered only when `SANDBOX_ENABLED=true` (the default) and Docker is available. PR delivery is planned, not implemented.

## Database

Gateway migrations live in `apps/gateway/migrations`, from `001` (users) through `009` (agent tables). They run through the one-shot `migrate` Docker Compose service or `make db-migrate`.

## Explicit Non-Goals

The former `apps/services/*` microservices were removed. There is no Kafka, Elasticsearch, Temporal, online IDE, visual workflow engine, billing system, notification microservice, one-click deployment, or bundled monitoring stack.
