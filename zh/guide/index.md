# 指南

欢迎阅读 **OmniDev — 面向团队的 AI 知识与编码工作台**文档。

## OmniDev 平台

一个提供多模型聊天、文档知识增强和沙箱后台 Agent 的模块化单体应用。

- [概述](/zh/platform/) — 当前功能与产品边界
- [快速开始](/zh/platform/getting-started) — 本地设置与检查
- [架构设计](/zh/platform/architecture) — 网关、内嵌知识引擎和 Agent 沙箱
- [配置说明](/zh/platform/configuration) — 环境变量
- [部署指南](/zh/platform/deployment) — Docker Compose 部署
- [API 参考](/zh/platform/api) — 聊天、知识库和 Agent HTTP API

## 知识引擎

OmniDev 内嵌的 RAG 模块，也可独立作为 HTTP API 和 MCP 服务使用。

- [概述](/zh/knowledge-engine/) — 引擎功能与特性
- [快速开始](/zh/knowledge-engine/getting-started) — 独立安装和设置
- [配置说明](/zh/knowledge-engine/configuration) — 环境变量
- [MCP 服务](/zh/knowledge-engine/mcp) — MCP 集成
- [适配器](/zh/knowledge-engine/adapters) — 可插拔适配器
- [部署指南](/zh/knowledge-engine/deployment) — 独立 Docker 部署

## 第一步

如需完整工作台，将 `omnidev` 和 `knowledge-engine` 并排克隆，然后按照[快速开始](/zh/platform/getting-started)操作。只有在不使用 OmniDev 网关和 Web UI、仅需知识引擎时，才需要按照独立知识引擎指南部署。
