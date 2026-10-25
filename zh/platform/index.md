# OmniDev 平台

**OmniDev — 面向团队的 AI 知识与编码工作台**，提供多模型聊天、检索增强知识库和后台编码 Agent。

## 已实现功能

### 聊天

- 支持 OpenAI、DeepSeek、Qwen、Anthropic，以及流式和非流式响应
- 会话管理、多模态图片和图片生成
- 附件使用 MinIO 存储、Apache Tika 解析
- 用户级 AI 提供商配置（BYOK）；设置 `ENCRYPTION_KEY` 后密钥加密保存
- 通过 streamable HTTP 调用外部 MCP 工具

### 知识库

- 知识库、文档上传与 Tika 解析、可配置的分块大小和重叠量
- OpenAI、Gemini 或 Ollama 嵌入，pgvector 相似度检索和 Redis 缓存
- 将 RAG 上下文注入聊天
- 向量维度按知识库记录，并跟随所使用的嵌入模型

网关内嵌 `knowledge-engine` Go 模块；该引擎也可在独立仓库中作为 HTTP API 和 MCP 服务运行。

### 后台 Agent

- 用户可定义系统提示词、最大步数和可用工具
- 异步运行并持久化记录，按“规划 → 思考/工具调用/代码执行 → 响应”循环执行
- 提供工作区文件操作与搜索、计算器和代码执行工具
- 在隔离且限制资源的 Docker 容器中运行 Python、JavaScript/Node.js、Go 和 Shell
- 通过真实 HTTP API 轮询运行状态或取消运行

Agent 自动创建 Pull Request 尚未实现，仅属于计划能力。

## 技术栈

| 层级 | 技术 |
|------|------|
| 后端 | `apps/gateway` 中的单一 Go 1.22+ 二进制（Gin） |
| 前端 | `apps/web` 中的 Next.js 15 / React 19 |
| 数据 | PostgreSQL 16 + pgvector / Redis 7 |
| 文件与解析 | MinIO / Apache Tika |
| Agent 运行时 | 一次性 Docker 容器 |

## 产品边界

OmniDev 是模块化单体，不是 16 个微服务的平台。当前不包含在线 IDE、可视化工作流画布、计费或订阅、一键部署、通知服务，也不内置 Prometheus/Grafana/Loki/Jaeger 监控栈。Kafka、Elasticsearch、Temporal、Kubernetes 和 Helm 均不属于当前架构。

参见[快速开始](/zh/platform/getting-started)、[架构设计](/zh/platform/architecture)和 [API 参考](/zh/platform/api)。
