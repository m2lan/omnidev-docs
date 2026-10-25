# Adapters

Knowledge Engine uses a pluggable adapter system for extensibility.

## Database Adapters

### PostgreSQL (Default)

The primary database adapter uses PostgreSQL with the pgvector extension.

**Features:**
- Vector similarity search (pgvector, HNSW)
- Full-text search with BM25-style ranking
- Chinese text support (zhparser when installed, `simple` otherwise)
- Connection pooling (`pgxpool`)
- Automatic migrations and dynamic embedding columns

**Configuration:**
```go
DatabaseURL: "postgres://user:pass@host:5432/dbname?sslmode=disable"
```

The embedding column is selected at startup: `embedding` (1536 dimensions) or
`embedding_<dims>` for any other size. This allows the same database to serve models with
different vector sizes. Indexes are created automatically for dimensions ≤ 2000.

## Embedding Adapters

### OpenAI

```go
Embedding: knowledge.EmbeddingConfig{
    Provider: "openai",
    APIKey:   "sk-...",
    Model:    "text-embedding-3-small",
}
```

`Dimensions` is optional; for `text-embedding-3-*` it is sent to OpenAI as the `dimensions`
parameter. Legacy models (`text-embedding-ada-002`) reject that parameter, so it is omitted
for them.

### Gemini

```go
Embedding: knowledge.EmbeddingConfig{
    Provider:   "gemini",
    APIKey:     "your-gemini-key",
    Model:      "gemini-embedding-001",
    Dimensions: 768,
}
```

### Ollama (OpenAI-compatible)

```go
Embedding: knowledge.EmbeddingConfig{
    Provider:   "ollama",
    BaseURL:    "http://localhost:11434/v1",
    Model:      "nomic-embed-text",
    Dimensions: 768,
}
```

Any OpenAI-compatible endpoint can be used through the `openai` provider with a `BaseURL`;
an API key is optional in that case.

## Parser Adapters

### Apache Tika (Default)

```go
Parser: knowledge.ParserConfig{
    Type:         "tika",
    TikaEndpoint: "http://localhost:9998",
    TikaTimeout:  60 * time.Second,
}
```

Documents are streamed to `PUT /tika` with their detected MIME type. Non-200 responses
surface Tika's error body instead of silently producing empty text.

### Native (Plain Text Only)

```go
Parser: knowledge.ParserConfig{
    Type: "native",
}
```

Supports txt, md, csv, json, xml, html, and common source-code files. When Tika is
configured, plain-text formats can fall back to native parsing if Tika is unreachable;
binary formats do not fall back. Set `DisableNativeFallback: true` to disable fallback.

## Storage Adapters

### Local Filesystem

```go
Storage: knowledge.StorageConfig{
    Type:      "local",
    Bucket:    "knowledge-docs",
    LocalPath: "./data/docs",
}
```

### MinIO / S3

```go
Storage: knowledge.StorageConfig{
    Type:      "minio",
    Bucket:    "knowledge",
    Endpoint:  "localhost:9000",
    AccessKey: "minioadmin",
    SecretKey: "minioadmin",
    UseSSL:    false,
}
```

## Auth Adapters

### JWT (HS256)

```go
Auth: knowledge.AuthConfig{
    Type:      "jwt",
    JWTSecret: "your-secret-key",
    Issuer:    "knowledge-engine",
}
```

The token must carry a UUID in `user_id` (or `sub`). `exp` is validated when present.

### Static API Key

```go
Auth: knowledge.AuthConfig{
    Type:         "apikey",
    APIKey:       "my-secret",
    APIKeyUserID: "00000000-0000-0000-0000-000000000001",
}
```

Requests send `X-API-Key: my-secret` or `Authorization: Bearer my-secret`. Comparison is
constant-time.

### No-op (Development)

```go
Auth: knowledge.AuthConfig{
    Type:          "noop",
    DefaultUserID: "00000000-0000-0000-0000-000000000001",
}
```

All requests are attributed to `DefaultUserID`, which must be a valid UUID. Do not expose
this mode publicly.

## Custom Adapters

Custom storage, cache, auth, and logging implementations can be passed to `NewFromPool`:

```go
// Custom Storage Backend (knowledge.Storage)
type Storage interface {
    Upload(ctx context.Context, bucket, key string, reader io.Reader, size int64, contentType string) (string, error)
    Download(ctx context.Context, bucket, key string) (io.ReadCloser, error)
    Delete(ctx context.Context, bucket, key string) error
    GetPresignedURL(ctx context.Context, bucket, key string, expiry time.Duration) (string, error)
}

// Custom Auth Provider (knowledge.Authenticator)
type Authenticator interface {
    Authenticate(token string) (*knowledge.UserInfo, error)
}

// Custom Cache (knowledge.Cache)
type Cache interface {
    Get(ctx context.Context, key string) ([]byte, error)
    Set(ctx context.Context, key string, value []byte, ttl time.Duration) error
    Delete(ctx context.Context, keys ...string) error
}
```

```go
engine, err := knowledge.NewFromPool(pool, emb, myStorage, myLogger)
```

For embedding providers, the built-in `openai` provider with a custom `BaseURL` covers most
OpenAI-compatible services (vLLM, LM Studio, LocalAI, Ollama). Additional providers register
through the internal embedder registry inside this module.
