# 配置说明

## 环境变量

### 服务器

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `SERVER_PORT` | `8080` | HTTP 服务器端口 |
| `SERVER_HOST` | `0.0.0.0` | HTTP 服务器主机 |
| `GIN_MODE` | `debug` | Gin 模式（debug/release） |

### 数据库

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `DB_HOST` | `localhost` | PostgreSQL 主机 |
| `DB_PORT` | `5432` | PostgreSQL 端口 |
| `DB_USER` | `postgres` | PostgreSQL 用户 |
| `DB_PASSWORD` | — | PostgreSQL 密码 |
| `DB_NAME` | `omnidev` | 数据库名称 |

### Redis

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `REDIS_HOST` | `localhost` | Redis 主机 |
| `REDIS_PORT` | `6379` | Redis 端口 |
| `REDIS_PASSWORD` | — | Redis 密码 |

### LLM 提供商

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `OPENAI_API_KEY` | — | OpenAI API 密钥 |
| `OPENAI_BASE_URL` | `https://api.openai.com/v1` | OpenAI API 基础 URL |
| `ANTHROPIC_API_KEY` | — | Anthropic API 密钥 |

### 嵌入向量

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `EMBEDDING_PROVIDER` | `openai` | 嵌入提供商（openai/jina） |
| `EMBEDDING_MODEL` | `text-embedding-3-small` | 嵌入模型名称 |
| `EMBEDDING_DIMENSION` | `1536` | 嵌入维度 |

## 配置文件

你也可以在项目根目录使用 `.env` 文件：

```bash
cp .env.example .env
# 编辑 .env 填入你的值
```
