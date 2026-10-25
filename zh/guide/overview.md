# 项目概览

## 两个仓库，一个集成工作台

OmniDev 将知识引擎作为内嵌 Go 模块使用，而不是独立的平台微服务。

```text
┌──────────────────────── OmniDev ────────────────────────┐
│ Next.js Web UI                                          │
│ Go 网关：认证 · 用户 · 聊天 · 知识库 · Agent             │
│                    │                                    │
│                    └── 内嵌 knowledge-engine 模块        │
└────────────────────────┬────────────────────────────────┘
                         │
       PostgreSQL + pgvector · Redis · MinIO · Tika · Docker
```

由于 `apps/gateway/go.mod` 使用本地 `replace` 引用 `knowledge-engine`，两个仓库必须并排克隆。知识引擎也提供独立的 HTTP API 和 MCP 服务，可供其他应用使用。

## 项目分工

| 组件 | OmniDev | 知识引擎 |
|------|---------|----------|
| 主要定位 | 面向团队的 AI 知识与编码工作台 | 可嵌入或独立运行的 RAG 引擎 |
| 后端 | 单一 Go/Gin 网关 | Go HTTP API 和 MCP 服务 |
| 前端 | Next.js 15 / React 19 | 无 |
| 数据 | PostgreSQL + pgvector、Redis | PostgreSQL + pgvector、可选 Redis 缓存 |
| 文档 | MinIO 附件，本地或 MinIO 知识库存储 | 可配置文档存储和 Tika 解析 |
| AI | 多模型聊天、嵌入、后台 Agent 规划器 | OpenAI、Gemini 和 Ollama 嵌入 |
| 执行 | 沙箱后台 Agent | 无 Agent 运行时 |

## 当前使用场景

### OmniDev

- **多模型聊天** — 流式会话、附件、图片、BYOK 和外部 MCP 工具
- **基于文档回答** — 上传文档，并将 pgvector 检索结果注入聊天
- **后台任务** — 使用工作区工具和隔离代码执行运行自定义 Agent

### 知识引擎

- **RAG 应用** — 为 LLM 应用提供文档上下文
- **语义检索** — 使用 pgvector 检索知识库
- **MCP 工具** — 向 MCP 客户端提供知识操作
- **文档管理** — 解析、分块、嵌入和检索文档

## 产品边界

OmniDev 当前不提供在线 IDE、可视化工作流、计费、一键部署或内置监控栈。Agent 自动创建 Pull Request 尚未实现，仅为计划能力。当前架构不使用 Kafka、Elasticsearch、Temporal，也不是 16 个微服务的部署。
