# 部署指南

OmniDev 以单一 Go 网关及其基础设施部署，而不是一组微服务。仓库提供的部署文件面向使用 Docker Compose 的本地开发环境。

## Docker Compose

确保 `knowledge-engine` 已作为同级仓库克隆，然后在 `omnidev` 仓库运行：

```bash
cp .env.example .env
make dev
```

`make dev` 组合 `deploy/docker/docker-compose.infra.yml` 和 `docker-compose.dev.yml`，启动：

- 带 pgvector 的 PostgreSQL 16、Redis 7、MinIO 和 Apache Tika
- 一次性数据库迁移服务
- 监听 `9090` 端口的 Go 网关
- 监听 `80` 和 `443` 端口的 nginx

该命令不会启动 Next.js 开发服务器；Web UI 仍需通过 `make web-dev` 单独启动，端口为 `3000`。

常用命令：

```bash
make dev-status
make dev-logs
make dev-down
```

## 数据库迁移

迁移文件位于 `apps/gateway/migrations`。Compose 会在网关启动前运行一次性 `migrate` 服务。对于本地数据库，可通过 `make db-migrate` 使用 `migrate` CLI 执行相同文件。

## 构建网关镜像

```bash
make docker-build
```

网关通过 Go 本地 `replace` 引用 `knowledge-engine`，因此构建上下文包含这个同级仓库。

## Docker 中的 Agent 沙箱

网关容器挂载 `/var/run/docker.sock`，以创建一次性的同级容器。`SANDBOX_HOST_WORKSPACE_ROOT` 必须指向挂载到网关 `SANDBOX_WORKSPACE_ROOT` 的宿主机目录。通过 `make sandbox-images` 预拉取运行时镜像。

只有 `SANDBOX_ENABLED=true` 且 Docker 可用时，Agent 接口才存在。Docker socket 和工作区权限应仅开放给可信运维人员。

## 配置与运维

- 在 `.env` 中设置强 `JWT_SECRET` 和真实的提供商凭据。
- 为 PostgreSQL、Redis 和 MinIO 使用持久卷，并保护 MinIO 控制台和数据库端口。
- 在反向代理层配置 TLS 和适当的请求限制。
- 使用网关的 `/health` 和 `/ready` 检查状态。

当前未提供 Kubernetes 或 Helm 部署、一键部署系统或 Prometheus/Grafana/Loki/Jaeger 监控栈，也没有需要单独部署的通知或计费服务。
