# Configuration

Configuration uses environment variables. Copy `.env.example` to `.env`; the values below are the development defaults from that file.

## Application and Data

| Variable | Default | Description |
|----------|---------|-------------|
| `APP_PORT` | `9090` | Gateway HTTP port |
| `DB_HOST`, `DB_PORT` | `localhost`, `5432` | PostgreSQL connection |
| `DB_USER`, `DB_PASSWORD`, `DB_NAME` | `omnidev`, `omnidev`, `omnidev` | PostgreSQL credentials and database |
| `DB_SSLMODE` | `disable` | PostgreSQL SSL mode |
| `REDIS_HOST`, `REDIS_PORT` | `localhost`, `6379` | Redis connection |
| `REDIS_PASSWORD`, `REDIS_DB` | empty, `0` | Redis authentication and database |
| `JWT_SECRET` | development value | JWT signing secret; replace it outside local development |
| `MINIO_ENDPOINT` | `localhost:9000` | Attachment storage endpoint; omit MinIO settings to disable uploads |
| `MINIO_ACCESS_KEY`, `MINIO_SECRET_KEY` | `minioadmin` | MinIO credentials |
| `MINIO_USE_SSL` | `false` | Use TLS for MinIO |
| `TIKA_ENDPOINT` | `http://localhost:9998` | Tika parser for attachments and knowledge documents |
| `TIKA_TIMEOUT` | `30` | Parser timeout in seconds |

OAuth is optional and uses the `GITHUB_*` and `GOOGLE_*` variables in `.env.example`.

## AI Providers

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY`, `OPENAI_BASE_URL`, `OPENAI_MODELS` | OpenAI or OpenAI-compatible provider settings |
| `DEEPSEEK_API_KEY`, `DEEPSEEK_MODELS` | DeepSeek settings |
| `QWEN_API_KEY` | Qwen provider key |
| `ANTHROPIC_API_KEY` | Anthropic provider key |
| `AI_DEFAULT_MODEL` | Default chat model (`deepseek-chat` in the example) |
| `ENCRYPTION_KEY` | Encrypts per-user BYOK provider keys when set |

Only providers with keys are registered. Users can also manage their own provider configurations through the web UI and `/user/ai-configs` API.

## Knowledge and RAG

| Variable | Default | Description |
|----------|---------|-------------|
| `RAG_EMBEDDING_PROVIDER` | `openai` | `openai`, `gemini`, or `ollama` |
| `RAG_EMBEDDING_MODEL` | `text-embedding-3-small` | Embedding model |
| `RAG_EMBEDDING_API_KEY` | empty | Embedding provider key |
| `RAG_EMBEDDING_BASE_URL` | empty | Custom embedding endpoint |
| `KNOWLEDGE_STORAGE_TYPE` | `local` | `local` or `minio` |
| `KNOWLEDGE_LOCAL_PATH` | `./data/knowledge` | Local document directory |
| `KNOWLEDGE_BUCKET` | `knowledge` | MinIO bucket |
| `KNOWLEDGE_PARSER_TYPE` | `tika` | Document parser |
| `KNOWLEDGE_CACHE_TTL` | `10m` | Search cache TTL |
| `KNOWLEDGE_EMBEDDING_DIMENSIONS` | `0` | `0` infers dimensions from the model response |

Dimensions are tracked per knowledge base. PostgreSQL must provide the `vector` extension.

## External MCP Tools

```bash
MCP_ENABLED=true
MCP_SERVERS='[{"name":"knowledge","url":"http://localhost:9100/mcp","api_key":"","timeout_seconds":15,"headers":{}}]'
```

`MCP_SERVERS` is a JSON array whose entries support `name`, `url`, `api_key`, `timeout_seconds`, and `headers`. The gateway uses streamable HTTP JSON-RPC 2.0. A server that cannot initialize is logged and skipped.

Chat runs at most five tool rounds and truncates each tool output to 8000 runes. Used tool names appear in message metadata as `tools_used`. MCP function calling currently applies to OpenAI, DeepSeek, and Qwen; it is not yet available for Anthropic models.

## Background Agent Sandbox

| Variable | Default | Description |
|----------|---------|-------------|
| `SANDBOX_ENABLED` | `true` | Register agent routes when Docker is available |
| `SANDBOX_WORKSPACE_ROOT` | `./data/agent-workspaces` | Gateway-side workspace root |
| `SANDBOX_HOST_WORKSPACE_ROOT` | empty | Host path of that same directory when the gateway runs in Docker |
| `SANDBOX_NETWORK` | `none` | Sandbox container network |
| `SANDBOX_CPU_LIMIT` | `1` | CPU limit |
| `SANDBOX_MEMORY_LIMIT` | `512m` | Memory limit |
| `SANDBOX_TIMEOUT` | `120s` | Code execution timeout |
| `SANDBOX_PYTHON_IMAGE` | `python:3.12-alpine` | Python runtime |
| `SANDBOX_NODE_IMAGE` | `node:22-alpine` | JavaScript/Node.js runtime |
| `SANDBOX_GO_IMAGE` | `golang:1.22-alpine` | Go runtime |
| `SANDBOX_SHELL_IMAGE` | `alpine:3.19` | Shell runtime |
| `AGENT_MODEL` | `gpt-4o-mini` | Planner model |
| `AGENT_BASE_URL`, `AGENT_API_KEY` | empty | Planner endpoint and key; fall back to `OPENAI_*` |

Run `make sandbox-images` to pre-pull the runtime images. When the gateway is containerized, `/var/run/docker.sock` must be mounted and `SANDBOX_HOST_WORKSPACE_ROOT` must be a host path, not a path inside the gateway container.
