# Configuration

## Environment Variables

### Database

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_HOST` | `localhost` | PostgreSQL host |
| `DB_PORT` | `5432` | PostgreSQL port |
| `DB_USER` | `postgres` | PostgreSQL user |
| `DB_PASSWORD` | — | PostgreSQL password |
| `DB_NAME` | `knowledge` | Database name |

### Redis

| Variable | Default | Description |
|----------|---------|-------------|
| `REDIS_HOST` | `localhost` | Redis host |
| `REDIS_PORT` | `6379` | Redis port |
| `REDIS_PASSWORD` | — | Redis password |

### Embedding

| Variable | Default | Description |
|----------|---------|-------------|
| `EMBEDDING_PROVIDER` | `openai` | Embedding provider (openai/gemini/ollama) |
| `EMBEDDING_MODEL` | `text-embedding-3-small` | Embedding model name |
| `EMBEDDING_API_KEY` | — | API key for embedding provider |
| `EMBEDDING_BASE_URL` | — | Custom base URL (for Ollama or compatible APIs) |
| `EMBEDDING_DIMENSION` | `1536` | Embedding dimension |

### Storage

| Variable | Default | Description |
|----------|---------|-------------|
| `STORAGE_TYPE` | `local` | Storage type (local/minio/s3) |
| `STORAGE_LOCAL_PATH` | `./uploads` | Local storage path |
| `STORAGE_S3_BUCKET` | — | S3 bucket name |
| `STORAGE_S3_REGION` | — | S3 region |
| `STORAGE_S3_ENDPOINT` | — | S3 endpoint (for MinIO) |

### Auth

| Variable | Default | Description |
|----------|---------|-------------|
| `AUTH_TYPE` | `jwt` | Auth type (jwt/noop) |
| `JWT_SECRET` | — | JWT secret key |

### Server

| Variable | Default | Description |
|----------|---------|-------------|
| `SERVER_PORT` | `8083` | HTTP server port |
| `SERVER_HOST` | `0.0.0.0` | HTTP server host |

## Configuration File

Create a `.env` file in the project root:

```bash
cp .env.example .env
# Edit .env with your values
```

## Programmatic Configuration

When using the Go SDK:

```go
engine, err := knowledge.New(knowledge.Config{
    DatabaseURL: "postgres://...",
    RedisURL:    "redis://localhost:6379",
    Embedding: knowledge.EmbeddingConfig{
        Provider:  "openai",
        APIKey:    "sk-...",
        Model:     "text-embedding-3-small",
        Dimension: 1536,
    },
    Storage: knowledge.StorageConfig{
        Type:      "minio",
        Bucket:    "knowledge",
        Endpoint:  "localhost:9000",
        AccessKey: "minioadmin",
        SecretKey: "minioadmin",
    },
    Auth: knowledge.AuthConfig{
        Type:       "jwt",
        JWTSecret:  "your-secret",
    },
})
```
