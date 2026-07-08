# Deployment

## Docker

### Build Image

```bash
docker build -t omnidev-platform .
```

### Run Container

```bash
docker run -d \
  --name omnidev \
  -p 8080:8080 \
  -e DB_HOST=your-db-host \
  -e DB_PASSWORD=your-password \
  omnidev-platform
```

## Docker Compose

```bash
docker compose up -d
```

This starts all services including:
- PostgreSQL
- Redis
- Kafka
- MinIO
- Elasticsearch
- OmniDev Platform

## Kubernetes

### Using Helm

```bash
helm repo add omnidev https://charts.omnidev.dev
helm install omnidev m2lan/omnidev-platform \
  --namespace omnidev \
  --create-namespace \
  --values values.yaml
```

### Manual Deployment

```bash
kubectl apply -f deploy/k8s/
```

## Environment-Specific Configs

- `deploy/k8s/dev/` — Development
- `deploy/k8s/staging/` — Staging
- `deploy/k8s/prod/` — Production
