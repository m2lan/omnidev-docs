# Configuration

The standalone server and the Go SDK share the same configuration model. Only
`DATABASE_URL` is required; everything else has a default.

## Environment Variables

### Database

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | — | PostgreSQL connection string (required) |
| `SKIP_MIGRATIONS` | `false` | Skip embedded SQL migrations on startup |

Migrations run automatically on startup (`schema_migrations` + advisory lock), including
`CREATE EXTENSION IF NOT EXISTS vector`. There are no initdb-only scripts to run manually.

### Cache

| Variable | Default | Description |
|----------|---------|-------------|
| `REDIS_URL` | — | Redis URL; empty or unreachable falls back to in-memory cache |
| `SEARCH_CACHE_TTL` | `60s` | Search result cache TTL |

Search cache keys are versioned per knowledge base. Ingestion, document deletion, and KB
updates bump the generation, so stale results are not served.

### Embedding

| Variable | Default | Description |
|----------|---------|-------------|
| `EMBEDDING_PROVIDER` | `openai` | `openai`, `gemini`, `ollama` |
| `EMBEDDING_MODEL` | provider default | Model name |
| `EMBEDDING_API_KEY` | — | Provider API key; optional for local OpenAI-compatible endpoints |
| `EMBEDDING_BASE_URL` | — | Custom endpoint (Ollama or compatible APIs) |
| `EMBEDDING_DIMENSIONS` | model default | Expected vector size; also sent as `dimensions` for OpenAI `text-embedding-3-*` |

The vector column is resolved from the effective dimensions at startup: `embedding` for 1536,
`embedding_<dims>` otherwise. Dimensions above 2000 skip the HNSW index (pgvector limit).

### Parser

| Variable | Default | Description |
|----------|---------|-------------|
| `PARSER_TYPE` | `tika` | `tika` or `native` |
| `TIKA_ENDPOINT` | `http://localhost:9998` | Apache Tika server base URL |
| `TIKA_TIMEOUT` | `60s` | Per-document parse timeout |
| `TIKA_DISABLE_NATIVE_FALLBACK` | `false` | Fail instead of locally parsing plain-text formats when Tika is down |

`native` only handles txt, md, csv, json, xml, html, and source code. Binary formats
(PDF, DOCX, PPTX, XLSX) require Tika.

### Storage

| Variable | Default | Description |
|----------|---------|-------------|
| `STORAGE_TYPE` | `local` | `local`, `minio` |
| `STORAGE_BUCKET` | `knowledge-docs` | Bucket name |
| `STORAGE_LOCAL_PATH` | `./data/docs` | Local storage path |
| `STORAGE_ENDPOINT` | — | MinIO/S3 endpoint |
| `STORAGE_ACCESS_KEY` | — | MinIO/S3 access key |
| `STORAGE_SECRET_KEY` | — | MinIO/S3 secret key |
| `STORAGE_USE_SSL` | `false` | Use TLS for MinIO/S3 |

### Auth

| Variable | Default | Description |
|----------|---------|-------------|
| `AUTH_TYPE` | inferred | `jwt`, `apikey`, `noop` |
| `JWT_SECRET` | — | HS256 secret; enables JWT when `AUTH_TYPE` is unset |
| `JWT_ISSUER` | `knowledge-engine` | Required issuer |
| `API_KEY` | — | Static key; enables API-key mode when `AUTH_TYPE` is unset |
| `API_KEY_USER_ID` | `00000000-0000-0000-0000-000000000001` | UUID attributed to API-key requests |
| `DEFAULT_USER_ID` | `00000000-0000-0000-0000-000000000001` | UUID attributed to no-op requests |

Inference order when `AUTH_TYPE` is empty: `API_KEY` → `apikey`, `JWT_SECRET` → `jwt`,
otherwise `noop`. API-key requests may send `X-API-Key: <key>` or
`Authorization: Bearer <key>`. JWTs must carry a UUID in `user_id` or `sub`.

### Server

| Variable | Default | Description |
|----------|---------|-------------|
| `SERVER_ADDRESS` | `:8083` | HTTP listen address |
| `SERVER_READ_TIMEOUT` | `30s` | Read timeout |
| `SERVER_WRITE_TIMEOUT` | `300s` | Write timeout (large uploads) |

## Programmatic Configuration

```go
engine, err := knowledge.New(knowledge.Config{
    DatabaseURL: "postgres://user:pass@host:5432/dbname?sslmode=disable",
    RedisURL:    "redis://localhost:6379/0",
    Cache: knowledge.CacheConfig{
        SearchTTL: 60 * time.Second,
    },
    Embedding: knowledge.EmbeddingConfig{
        Provider:   "openai",
        APIKey:     "sk-...",
        Model:      "text-embedding-3-small",
        Dimensions: 1536, // 0 means model default
    },
    Parser: knowledge.ParserConfig{
        Type:         "tika",
        TikaEndpoint: "http://localhost:9998",
        TikaTimeout:  60 * time.Second,
    },
    Storage: knowledge.StorageConfig{
        Type:      "minio",
        Bucket:    "knowledge",
        Endpoint:  "localhost:9000",
        AccessKey: "minioadmin",
        SecretKey: "minioadmin",
    },
    Auth: knowledge.AuthConfig{
        Type:      "jwt",
        JWTSecret: "your-secret",
        Issuer:    "knowledge-engine",
    },
})
```

When embedding into an existing application, `NewFromPool` accepts the same adapters and
returns an error:

```go
engine, err := knowledge.NewFromPool(pool, emb, storage, logger)
if err != nil {
    return err
}
```
