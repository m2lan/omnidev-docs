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
| `RAG_EMBEDDING_PROVIDER` | `openai` | 嵌入提供商（openai/gemini/ollama） |
| `RAG_EMBEDDING_MODEL` | 模型默认值 | 嵌入模型名称 |
| `RAG_EMBEDDING_API_KEY` | — | 嵌入 API Key（缺省时回退到提供商 Key） |
| `RAG_EMBEDDING_BASE_URL` | — | 自定义嵌入端点 |

### 知识引擎（网关）

网关以进程内库的方式嵌入 `knowledge-engine`。由于网关中间件已完成认证，引擎使用 noop 认证。

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `KNOWLEDGE_STORAGE_TYPE` | 配置 MinIO 时为 `minio`，否则 `local` | 文档存储后端 |
| `KNOWLEDGE_BUCKET` | `rag-documents` | MinIO/S3 存储桶 |
| `KNOWLEDGE_LOCAL_PATH` | `./data/knowledge` | 本地存储路径 |
| `KNOWLEDGE_PARSER_TYPE` | `tika` | `tika` 或 `native` |
| `KNOWLEDGE_CACHE_TTL` | `60s` | 搜索结果缓存时长 |
| `KNOWLEDGE_EMBEDDING_DIMENSIONS` | 模型默认值 | 期望向量维度 |

`TIKA_ENDPOINT` 与 `TIKA_TIMEOUT` 用于配置解析器。PostgreSQL 需要可用的 `vector` 扩展。

### 聊天服务 — 外部 MCP 工具

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `MCP_ENABLED` | `false` | 开启外部 MCP 服务工具调用 |
| `MCP_SERVERS` | — | MCP 服务 JSON 数组（见下） |

```bash
MCP_ENABLED=true
MCP_SERVERS='[{"name":"knowledge","url":"http://knowledge-engine:8083/mcp","api_key":"","timeout_seconds":30}]'
```

每个服务支持 `name`、`url`、`api_key`、`timeout_seconds` 和 `headers`。聊天服务会逐个初始化、
获取工具列表并交给模型调用；初始化失败的服务会被记录并跳过，不影响聊天主流程。

## 配置文件

你也可以在项目根目录使用 `.env` 文件：

```bash
cp .env.example .env
# 编辑 .env 填入你的值
```
