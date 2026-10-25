# 配置说明

应用通过环境变量配置。复制 `.env.example` 为 `.env`；下表默认值取自该示例文件。

## 应用与数据

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `APP_PORT` | `9090` | 网关 HTTP 端口 |
| `DB_HOST`、`DB_PORT` | `localhost`、`5432` | PostgreSQL 连接地址 |
| `DB_USER`、`DB_PASSWORD`、`DB_NAME` | `omnidev`、`omnidev`、`omnidev` | PostgreSQL 凭据和数据库名 |
| `DB_SSLMODE` | `disable` | PostgreSQL SSL 模式 |
| `REDIS_HOST`、`REDIS_PORT` | `localhost`、`6379` | Redis 连接地址 |
| `REDIS_PASSWORD`、`REDIS_DB` | 空、`0` | Redis 认证和数据库编号 |
| `JWT_SECRET` | 开发示例值 | JWT 签名密钥；非本地开发环境必须更换 |
| `MINIO_ENDPOINT` | `localhost:9000` | 附件存储端点；不配置 MinIO 则禁用上传 |
| `MINIO_ACCESS_KEY`、`MINIO_SECRET_KEY` | `minioadmin` | MinIO 凭据 |
| `MINIO_USE_SSL` | `false` | 是否通过 TLS 连接 MinIO |
| `TIKA_ENDPOINT` | `http://localhost:9998` | 用于附件和知识文档的 Tika 解析器 |
| `TIKA_TIMEOUT` | `30` | 解析超时时间（秒） |

OAuth 为可选功能，使用 `.env.example` 中的 `GITHUB_*` 和 `GOOGLE_*` 变量。

## AI 提供商

| 变量 | 说明 |
|------|------|
| `OPENAI_API_KEY`、`OPENAI_BASE_URL`、`OPENAI_MODELS` | OpenAI 或 OpenAI 兼容提供商设置 |
| `DEEPSEEK_API_KEY`、`DEEPSEEK_MODELS` | DeepSeek 设置 |
| `QWEN_API_KEY` | Qwen 密钥 |
| `ANTHROPIC_API_KEY` | Anthropic 密钥 |
| `AI_DEFAULT_MODEL` | 默认聊天模型（示例中为 `deepseek-chat`） |
| `ENCRYPTION_KEY` | 设置后加密用户级 BYOK 提供商密钥 |

只有配置了密钥的提供商才会注册。用户也可通过 Web UI 和 `/user/ai-configs` API 管理自己的提供商配置。

## 知识库与 RAG

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `RAG_EMBEDDING_PROVIDER` | `openai` | `openai`、`gemini` 或 `ollama` |
| `RAG_EMBEDDING_MODEL` | `text-embedding-3-small` | 嵌入模型 |
| `RAG_EMBEDDING_API_KEY` | 空 | 嵌入提供商密钥 |
| `RAG_EMBEDDING_BASE_URL` | 空 | 自定义嵌入端点 |
| `KNOWLEDGE_STORAGE_TYPE` | `local` | `local` 或 `minio` |
| `KNOWLEDGE_LOCAL_PATH` | `./data/knowledge` | 本地文档目录 |
| `KNOWLEDGE_BUCKET` | `knowledge` | MinIO 存储桶 |
| `KNOWLEDGE_PARSER_TYPE` | `tika` | 文档解析器 |
| `KNOWLEDGE_CACHE_TTL` | `10m` | 检索缓存时长 |
| `KNOWLEDGE_EMBEDDING_DIMENSIONS` | `0` | `0` 表示从模型响应推断维度 |

向量维度按知识库记录。PostgreSQL 必须提供 `vector` 扩展。

## 外部 MCP 工具

```bash
MCP_ENABLED=true
MCP_SERVERS='[{"name":"knowledge","url":"http://localhost:9100/mcp","api_key":"","timeout_seconds":15,"headers":{}}]'
```

`MCP_SERVERS` 是 JSON 数组，每项支持 `name`、`url`、`api_key`、`timeout_seconds` 和 `headers`。网关使用 streamable HTTP JSON-RPC 2.0；初始化失败的服务会记录日志并跳过。

聊天最多执行五轮工具调用，每次工具输出截断为 8000 个 rune，工具名称记录在消息元数据 `tools_used` 中。MCP 函数调用目前适用于 OpenAI、DeepSeek 和 Qwen，暂不支持 Anthropic 模型。

## 后台 Agent 沙箱

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `SANDBOX_ENABLED` | `true` | Docker 可用时注册 Agent 路由 |
| `SANDBOX_WORKSPACE_ROOT` | `./data/agent-workspaces` | 网关侧工作区根目录 |
| `SANDBOX_HOST_WORKSPACE_ROOT` | 空 | 网关在 Docker 中运行时，同一目录的宿主机路径 |
| `SANDBOX_NETWORK` | `none` | 沙箱容器网络 |
| `SANDBOX_CPU_LIMIT` | `1` | CPU 限制 |
| `SANDBOX_MEMORY_LIMIT` | `512m` | 内存限制 |
| `SANDBOX_TIMEOUT` | `120s` | 代码执行超时 |
| `SANDBOX_PYTHON_IMAGE` | `python:3.12-alpine` | Python 运行时 |
| `SANDBOX_NODE_IMAGE` | `node:22-alpine` | JavaScript/Node.js 运行时 |
| `SANDBOX_GO_IMAGE` | `golang:1.22-alpine` | Go 运行时 |
| `SANDBOX_SHELL_IMAGE` | `alpine:3.19` | Shell 运行时 |
| `AGENT_MODEL` | `gpt-4o-mini` | 规划器模型 |
| `AGENT_BASE_URL`、`AGENT_API_KEY` | 空 | 规划器端点和密钥；未设置时回退到 `OPENAI_*` |

运行 `make sandbox-images` 可预拉取运行时镜像。网关容器化运行时，必须挂载 `/var/run/docker.sock`，且 `SANDBOX_HOST_WORKSPACE_ROOT` 必须是宿主机路径，而不是网关容器内路径。
