# Deployment

OmniDev is deployed as one Go gateway plus its infrastructure, not as a fleet of microservices. The supplied deployment files target local development with Docker Compose.

## Docker Compose

From the `omnidev` repository, with `knowledge-engine` cloned as a sibling:

```bash
cp .env.example .env
make dev
```

`make dev` combines `deploy/docker/docker-compose.infra.yml` and `docker-compose.dev.yml` to start:

- PostgreSQL 16 with pgvector, Redis 7, MinIO, and Apache Tika
- the one-shot database migration service
- the Go gateway on port `9090`
- nginx on ports `80` and `443`

It does not start the Next.js development server; run `make web-dev` separately for the web UI on port `3000`.

Useful commands:

```bash
make dev-status
make dev-logs
make dev-down
```

## Database Migrations

Migrations are in `apps/gateway/migrations`. Compose runs the `migrate` one-shot service before the gateway. For a local database, `make db-migrate` applies the same files using the `migrate` CLI.

## Build the Gateway Image

```bash
make docker-build
```

The build context includes the sibling `knowledge-engine` repository because the gateway imports it through a local Go `replace` directive.

## Agent Sandboxes in Docker

The gateway container mounts `/var/run/docker.sock` so it can create throwaway sibling containers. Set `SANDBOX_HOST_WORKSPACE_ROOT` to the host path that is mounted at `SANDBOX_WORKSPACE_ROOT` in the gateway. Pre-pull runtime images with `make sandbox-images`.

Agent endpoints exist only when `SANDBOX_ENABLED=true` and Docker is available. Keep the Docker socket and workspace permissions restricted to trusted operators.

## Configuration and Operations

- Set a strong `JWT_SECRET` and real provider credentials in `.env`.
- Use persistent volumes for PostgreSQL, Redis, and MinIO, and protect the MinIO console and database ports.
- Put TLS and appropriate request limits at the reverse proxy.
- Check `/health` and `/ready` on the gateway.

There is no supplied Kubernetes or Helm deployment, one-click deployment system, or Prometheus/Grafana/Loki/Jaeger monitoring stack. There is also no separate notification or billing service to deploy.
