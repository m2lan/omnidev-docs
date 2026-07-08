# Adapters

Knowledge Engine uses a pluggable adapter system for extensibility.

## Database Adapters

### PostgreSQL (Default)

The primary database adapter using PostgreSQL with pgvector extension.

**Features:**
- Vector similarity search (pgvector)
- Full-text search with BM25
- Chinese text support (zhparser)
- Connection pooling

**Configuration:**
```go
DatabaseURL: "postgres://user:pass@host:5432/dbname?sslmode=disable"
```

## Embedding Adapters

### OpenAI

```go
Embedding: knowledge.EmbeddingConfig{
    Provider: "openai",
    APIKey:   "sk-...",
    Model:    "text-embedding-3-small",
}
```

### Gemini

```go
Embedding: knowledge.EmbeddingConfig{
    Provider: "gemini",
    APIKey:   "your-gemini-key",
    Model:    "text-embedding-004",
}
```

### Ollama (OpenAI-compatible)

```go
Embedding: knowledge.EmbeddingConfig{
    Provider:  "ollama",
    BaseURL:   "http://localhost:11434/v1",
    Model:     "nomic-embed-text",
}
```

## Storage Adapters

### Local Filesystem

```go
Storage: knowledge.StorageConfig{
    Type: "local",
    Path: "./uploads",
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

### JWT

```go
Auth: knowledge.AuthConfig{
    Type:      "jwt",
    JWTSecret: "your-secret-key",
}
```

### No-op (Development)

```go
Auth: knowledge.AuthConfig{
    Type: "noop",
}
```

## Custom Adapters

Implement the corresponding interface to create custom adapters:

```go
// Custom Embedding Provider
type Embedder interface {
    Embed(ctx context.Context, texts []string) ([][]float32, error)
}

// Custom Storage Backend
type Storage interface {
    Upload(ctx context.Context, path string, reader io.Reader) error
    Download(ctx context.Context, path string) (io.ReadCloser, error)
    Delete(ctx context.Context, path string) error
}

// Custom Auth Provider
type Authenticator interface {
    Authenticate(ctx context.Context, token string) (string, error)
}
```

Register custom adapters in the adapter registry:

```go
knowledge.RegisterEmbedder("custom", func(cfg knowledge.EmbeddingConfig) (Embedder, error) {
    return NewCustomEmbedder(cfg), nil
})
```
