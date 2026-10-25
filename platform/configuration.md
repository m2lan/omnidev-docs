# Configuration

## Environment Variables

### Server

| Variable | Default | Description |
|----------|---------|-------------|
| `SERVER_PORT` | `8080` | HTTP server port |
| `SERVER_HOST` | `0.0.0.0` | HTTP server host |
| `GIN_MODE` | `debug` | Gin mode (debug/release) |

### Database

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_HOST` | `localhost` | PostgreSQL host |
| `DB_PORT` | `5432` | PostgreSQL port |
| `DB_USER` | `postgres` | PostgreSQL user |
| `DB_PASSWORD` | — | PostgreSQL password |
| `DB_NAME` | `omnidev` | Database name |

### Redis

| Variable | Default | Description |
|----------|---------|-------------|
| `REDIS_HOST` | `localhost` | Redis host |
| `REDIS_PORT` | `6379` | Redis port |
| `REDIS_PASSWORD` | — | Redis password |

### LLM Providers

| Variable | Default | Description |
|----------|---------|-------------|
| `OPENAI_API_KEY` | — | OpenAI API key |
| `OPENAI_BASE_URL` | `https://api.openai.com/v1` | OpenAI API base URL |
| `ANTHROPIC_API_KEY` | — | Anthropic API key |

### Embedding

| Variable | Default | Description |
|----------|---------|-------------|
| `RAG_EMBEDDING_PROVIDER` | `openai` | Embedding provider (openai/gemini/ollama) |
| `RAG_EMBEDDING_MODEL` | model default | Embedding model name |
| `RAG_EMBEDDING_API_KEY` | — | Embedding API key (falls back to the provider key) |
| `RAG_EMBEDDING_BASE_URL` | — | Custom embedding endpoint |

### Knowledge Engine (Gateway)

The gateway embeds `knowledge-engine` in-process. The engine runs with noop auth because gateway
middleware has already authenticated the request.

| Variable | Default | Description |
|----------|---------|-------------|
| `KNOWLEDGE_STORAGE_TYPE` | `minio` when MinIO is configured, else `local` | Document storage backend |
| `KNOWLEDGE_BUCKET` | `rag-documents` | MinIO/S3 bucket |
| `KNOWLEDGE_LOCAL_PATH` | `./data/knowledge` | Local storage path |
| `KNOWLEDGE_PARSER_TYPE` | `tika` | `tika` or `native` |
| `KNOWLEDGE_CACHE_TTL` | `60s` | Search result cache TTL |
| `KNOWLEDGE_EMBEDDING_DIMENSIONS` | model default | Expected embedding size |

`TIKA_ENDPOINT` and `TIKA_TIMEOUT` configure the parser. PostgreSQL must have the `vector`
extension available.

### Chat Service — External MCP Tools

| Variable | Default | Description |
|----------|---------|-------------|
| `MCP_ENABLED` | `false` | Enable tool calling through external MCP servers |
| `MCP_SERVERS` | — | JSON array of MCP servers (see below) |

```bash
MCP_ENABLED=true
MCP_SERVERS='[{"name":"knowledge","url":"http://knowledge-engine:8083/mcp","api_key":"","timeout_seconds":30}]'
```

Each server entry supports `name`, `url`, `api_key`, `timeout_seconds`, and `headers`. The chat
service initializes each server, lists its tools, and lets the model call them. A server that fails
to initialize is logged and skipped so chat keeps working.

## Configuration File

You can also use a `.env` file in the project root:

```bash
cp .env.example .env
# Edit .env with your values
```
