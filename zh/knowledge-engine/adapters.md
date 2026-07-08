# 适配器

知识引擎使用可插拔的适配器系统以实现可扩展性。

## 数据库适配器

### PostgreSQL（默认）

使用 pgvector 扩展的主数据库适配器。

**功能：**
- 向量相似度搜索（pgvector）
- BM25 全文搜索
- 中文文本支持（zhparser）
- 连接池

**配置：**
```go
DatabaseURL: "postgres://user:pass@host:5432/dbname?sslmode=disable"
```

## 嵌入适配器

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

### Ollama（兼容 OpenAI）

```go
Embedding: knowledge.EmbeddingConfig{
    Provider:  "ollama",
    BaseURL:   "http://localhost:11434/v1",
    Model:     "nomic-embed-text",
}
```

## 存储适配器

### 本地文件系统

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

## 认证适配器

### JWT

```go
Auth: knowledge.AuthConfig{
    Type:      "jwt",
    JWTSecret: "your-secret-key",
}
```

### 无认证（开发环境）

```go
Auth: knowledge.AuthConfig{
    Type: "noop",
}
```

## 自定义适配器

实现相应接口以创建自定义适配器：

```go
// 自定义嵌入提供商
type Embedder interface {
    Embed(ctx context.Context, texts []string) ([][]float32, error)
}

// 自定义存储后端
type Storage interface {
    Upload(ctx context.Context, path string, reader io.Reader) error
    Download(ctx context.Context, path string) (io.ReadCloser, error)
    Delete(ctx context.Context, path string) error
}

// 自定义认证提供商
type Authenticator interface {
    Authenticate(ctx context.Context, token string) (string, error)
}
```

在适配器注册表中注册自定义适配器：

```go
knowledge.RegisterEmbedder("custom", func(cfg knowledge.EmbeddingConfig) (Embedder, error) {
    return NewCustomEmbedder(cfg), nil
})
```
