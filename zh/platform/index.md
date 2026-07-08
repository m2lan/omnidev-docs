# OmniDev 平台

集成 IDE、Agent、RAG、工作流、部署于一体的 AI 开发平台。

## 概述

OmniDev 平台是一个综合性的 AI 开发环境，旨在简化整个开发生命周期。它将多种工具和服务整合到一个统一的平台中。

## 核心特性

- **集成 IDE** — 基于浏览器的开发环境
- **AI Agent** — 具有上下文感知能力的智能编码助手
- **RAG 系统** — 用于代码和文档的检索增强生成
- **工作流引擎** — 基于 Temporal 的可视化工作流构建器
- **部署管道** — 一键部署到多个环境
- **团队协作** — 实时协作工具

## 技术栈

| 层级 | 技术 |
|------|------|
| 后端 | Go 1.22+ / Gin / gRPC / Wire |
| 前端 | Next.js 15 / React 19 / Tailwind / Shadcn/ui |
| 数据库 | PostgreSQL 16 + pgvector / Redis 7 / Kafka |
| 存储 | MinIO（兼容 S3） |
| 搜索 | Elasticsearch 8 |
| 工作流 | Temporal |
| 基础设施 | Docker / Kubernetes / Helm |
| 可观测性 | Prometheus / Grafana / Loki / Jaeger |

## 快速开始

参见[快速开始](/zh/platform/getting-started)了解安装和设置说明。

## 架构设计

参见[架构设计](/zh/platform/architecture)了解系统设计和组件概览。
