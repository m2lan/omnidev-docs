# Deployment

## Docker

### Build Image

```bash
docker build -t knowledge-engine .
```

### Run Container

```bash
docker run -d \
  --name knowledge-engine \
  -p 8083:8083 \
  -e DB_HOST=your-db-host \
  -e DB_PASSWORD=your-password \
  -e EMBEDDING_API_KEY=sk-... \
  knowledge-engine
```

## Docker Compose

```bash
docker-compose -f deploy/docker/docker-compose.yml up -d
```

This starts:
- PostgreSQL with pgvector
- Redis
- Knowledge Engine

## Kubernetes

### Using Helm

```bash
helm repo add omnidev https://charts.omnidev.dev
helm install knowledge-engine m2lan/knowledge-engine \
  --namespace knowledge-engine \
  --create-namespace \
  --values values.yaml
```

### Manual Deployment

```bash
kubectl apply -f deploy/k8s/
```

## Environment Variables for Production

```bash
# Database
DB_HOST=your-production-db
DB_PORT=5432
DB_USER=knowledge
DB_PASSWORD=<strong-password>
DB_NAME=knowledge

# Redis
REDIS_HOST=your-production-redis
REDIS_PORT=6379
REDIS_PASSWORD=<strong-password>

# Embedding
EMBEDDING_PROVIDER=openai
EMBEDDING_API_KEY=sk-...
EMBEDDING_MODEL=text-embedding-3-small

# Storage
STORAGE_TYPE=minio
STORAGE_S3_BUCKET=knowledge
STORAGE_S3_ENDPOINT=minio.internal:9000
STORAGE_S3_ACCESS_KEY=<access-key>
STORAGE_S3_SECRET_KEY=<secret-key>

# Auth
AUTH_TYPE=jwt
JWT_SECRET=<strong-secret>

# Server
SERVER_PORT=8083
GIN_MODE=release
```

## Health Check

```bash
curl http://localhost:8083/health
```

## Monitoring

Knowledge Engine exposes metrics at `/metrics` for Prometheus scraping.

```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'knowledge-engine'
    static_configs:
      - targets: ['knowledge-engine:8083']
```
