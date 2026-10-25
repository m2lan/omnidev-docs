# 快速开始

## 前置要求

- Go 1.22+
- Node.js 20+ 和 pnpm 9
- Docker 与 Docker Compose
- 后台 Agent 沙箱需要可用的 Docker 权限

## 1. 克隆两个仓库

网关通过 Go 本地 `replace` 引用 `knowledge-engine`，因此两个仓库必须放在同一级目录：

```bash
git clone https://github.com/m2lan/omnidev.git
git clone https://github.com/m2lan/knowledge-engine.git
cd omnidev
```

克隆后，同一父目录下应同时存在 `omnidev/` 和 `knowledge-engine/`。

## 2. 配置应用

```bash
make setup
```

该命令会复制 `.env.example` 为 `.env` 并安装前端依赖。编辑 `.env`，至少设置 `JWT_SECRET` 和需要使用的 AI 提供商密钥。提供商、RAG、MCP 和沙箱设置详见[配置说明](/zh/platform/configuration)。

## 3. 启动基础设施并执行迁移

```bash
make dev-infra
```

这会启动带 pgvector 的 PostgreSQL 16、Redis 7、MinIO 和 Apache Tika。一次性 `migrate` 服务会执行 `apps/gateway/migrations` 中 `001` 至 `009` 的迁移。若要直接迁移本地数据库，也可安装 `migrate` CLI 后运行 `make db-migrate`。

可选择预先拉取 Agent 运行时镜像：

```bash
make sandbox-images
```

## 4. 启动网关和 Web UI

分别在两个终端运行：

```bash
make run-gateway
```

```bash
make web-dev
```

- API：`http://localhost:9090`
- Web UI：`http://localhost:3000`
- 健康检查：`http://localhost:9090/health`

## 使用 Docker 运行

```bash
make dev
```

该命令在 Docker 中构建并启动网关、nginx、基础设施和数据库迁移；Next.js 开发服务器仍需通过 `make web-dev` 单独启动。

网关在 Docker 中运行时，会挂载 Docker socket 以创建沙箱。`SANDBOX_HOST_WORKSPACE_ROOT` 必须设置为挂载到网关的工作区目录在**宿主机**上的路径。

## 检查

```bash
go build ./apps/gateway/... ./packages/go-common/...
go test ./apps/gateway/... ./packages/go-common/...
pnpm --filter web typecheck
```
