# Getting Started

## Prerequisites

- Go 1.22+
- Node.js 20+ and pnpm 9
- Docker with Docker Compose
- Docker access for background-agent sandboxes

## 1. Clone Both Repositories

The gateway imports `knowledge-engine` through a local Go `replace` directive, so the repositories must be siblings:

```bash
git clone https://github.com/m2lan/omnidev.git
git clone https://github.com/m2lan/knowledge-engine.git
cd omnidev
```

The resulting layout is `omnidev/` and `knowledge-engine/` in the same parent directory.

## 2. Configure the Application

```bash
make setup
```

This copies `.env.example` to `.env` and installs frontend dependencies. Edit `.env` to set at least `JWT_SECRET` and the AI provider keys you intend to use. See [Configuration](/platform/configuration) for provider, RAG, MCP, and sandbox settings.

## 3. Start Infrastructure and Migrations

```bash
make dev-infra
```

This starts PostgreSQL 16 with pgvector, Redis 7, MinIO, and Apache Tika. The one-shot `migrate` service applies the migrations in `apps/gateway/migrations` (`001` through `009`). To apply them directly to the local database instead, use `make db-migrate` with the `migrate` CLI installed.

Optionally pre-pull the agent runtime images:

```bash
make sandbox-images
```

## 4. Run the Gateway and Web UI

Use separate terminals:

```bash
make run-gateway
```

```bash
make web-dev
```

- API: `http://localhost:9090`
- Web UI: `http://localhost:3000`
- Health check: `http://localhost:9090/health`

## Docker Alternative

```bash
make dev
```

This builds and starts the gateway, nginx, infrastructure, and migrations in Docker. The Next.js development server is still started separately with `make web-dev`.

When the gateway runs in Docker, the Docker socket is mounted for sandboxes. Set `SANDBOX_HOST_WORKSPACE_ROOT` to the **host** path of the workspace directory mounted into the gateway.

## Checks

```bash
go build ./apps/gateway/... ./packages/go-common/...
go test ./apps/gateway/... ./packages/go-common/...
pnpm --filter web typecheck
```
