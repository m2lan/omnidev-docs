# 配置说明

## 环境变量

### 数据库

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `DB_HOST` | `localhost` | PostgreSQL 主机 |
| `DB_PORT` | `5432` | PostgreSQL 端口 |
| `DB_USER` | `postgres` | PostgreSQL 用户 |
| `DB_PASSWORD` | — | PostgreSQL 密码 |
| `DB_NAME` | `knowledge` | 数据库名称 |

### Redis

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `REDIS_HOST` | `localhost` | Redis 主机 |
| `REDIS_PORT` | `6379` | Redis 端口 |
| `REDIS_PASSWORD` | — | Redis 密码 |

### 嵌入向量

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `EMBEDDING_PROVIDER` | `openai` | 嵌入提供商（openai/gemini/ollama） |
| `EMBEDDING_MODEL` | `text-embedding-3-small` | 嵌入模型名称 |
| `EMBEDDING_API_KEY` | — | 嵌入提供商 API 密钥 |
| `EMBEDDING_BASE_URL` | — | 自定义基础 URL（用于 Ollama 或兼容 API） |
| `EMBEDDING_DIMENSION` | `1536` | 嵌入维度 |

### 存储

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `STORAGE_TYPE` | `local` | 存储类型（local/minio/s3） |
| `STORAGE_LOCAL_PATH` | `./uploads` | 本地存储路径 |
| `STORAGE_S3_BUCKET` | — | S3 存储桶名称 |
| `STORAGE_S3_REGION` | — | S3 区域 |
| `STORAGE_S3_ENDPOINT` | — | S3 端点（用于 MinIO） |

### 认证

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `AUTH_TYPE` | `jwt` | 认证类型（jwt/noop） |
| `JWT_SECRET` | — | JWT 密钥 |

### 服务器

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `SERVER_PORT` | `8083` | HTTP 服务器端口 |
| `SERVER_HOST` | `0.0.0.0` | HTTP 服务器主机 |

## 配置文件

在项目根目录创建 `.env` 文件：

```bash
cp .env.example .env
# 编辑 .env 填入你的值
```

## 编程配置

使用 Go SDK 时：

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
