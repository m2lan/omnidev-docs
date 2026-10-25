# 架构设计

## 模块化单体

OmniDev 只有一个后端二进制 `apps/gateway`，其中包含认证、用户、聊天、知识库和 Agent 模块，不会拆分为多个微服务部署。

```text
Next.js 15 / React 19（apps/web）
              │ HTTP / SSE
              ▼
Go 网关（apps/gateway）
  认证 · 用户 · 聊天 · 知识库 · Agent
              │
              ├── PostgreSQL 16 + pgvector
              ├── Redis 7
              ├── MinIO 与 Apache Tika
              ├── 外部 MCP 服务（streamable HTTP）
              └── Docker daemon（Agent 沙箱）
```

后端共享代码位于 `packages/go-common`。网关通过本地 `replace` 引用同级仓库中的 `knowledge-engine` Go 模块，因此两个仓库必须并排克隆。知识引擎也可从自己的仓库独立运行，提供 HTTP API 和 MCP 服务。

## 聊天

聊天模块支持 OpenAI、DeepSeek、Qwen、Anthropic，流式和非流式响应、会话、多模态图片及图片生成。附件使用 MinIO 和 Tika。用户可配置自己的提供商（BYOK）；设置 `ENCRYPTION_KEY` 后，提供商密钥会加密保存。

设置 `MCP_ENABLED=true` 后，网关通过 streamable HTTP 上的 JSON-RPC 2.0 调用外部 MCP 服务（`initialize`、`tools/list`、`tools/call`）。聊天最多执行五轮工具调用，工具输出截断为 8000 个 rune，并将工具名称记录在消息元数据的 `tools_used` 中。

目前函数调用支持 OpenAI 兼容适配器（OpenAI、DeepSeek、Qwen）。Anthropic 适配器尚未映射 `tool_use`/`tool_result` 块，因此暂不会向 Anthropic 模型提供 MCP 工具。

## 知识库

内嵌引擎提供知识库、Tika 文档解析、可配置的分块大小与重叠量、嵌入、pgvector 相似度检索、Redis 缓存，以及向聊天注入 RAG 上下文。嵌入提供商包括 OpenAI、Gemini 和 Ollama。向量维度按知识库保存并跟随嵌入模型，不存在全局固定的 768/1536 维限制。

## 后台 Agent

用户可定义 Agent 的名称、描述、系统提示词、最大步数和工具。运行异步执行，并将 `agents`、`agent_runs`、`agent_steps` 持久化到 PostgreSQL。执行循环先规划，再进行思考、工具调用或代码执行，最后生成响应。

工具包括工作区文件读取/写入/列出/删除、工作区搜索、计算器和代码执行。代码在一次性 Docker 容器中运行，隔离措施包括：

- 将本次运行的工作区挂载到 `/workspace`
- `--network none`、只读根文件系统和 tmpfs `/tmp`
- 删除所有 capabilities，并启用 `no-new-privileges`
- CPU、内存和 PID 限制
- 默认 120 秒超时，stdout/stderr 上限均为 1 MiB

支持 Python、JavaScript/Node.js、Go 和 Shell。运行可轮询、可取消。只有 `SANDBOX_ENABLED=true`（默认值）且 Docker 可用时才注册 Agent 路由。自动创建 PR 尚未实现，仅为计划能力。

## 数据库

网关迁移位于 `apps/gateway/migrations`，从 `001`（用户）到 `009`（Agent 表）。迁移通过一次性 `migrate` Docker Compose 服务或 `make db-migrate` 执行。

## 明确的非目标

旧 `apps/services/*` 微服务已删除。当前没有 Kafka、Elasticsearch、Temporal、在线 IDE、可视化工作流引擎、计费系统、通知微服务、一键部署或内置监控栈。
