# 部署指南

## Docker

### 构建镜像

```bash
docker build -t knowledge-engine .
```

### 运行容器

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

这将启动：
- PostgreSQL（带 pgvector）
- Redis
- 知识引擎

## Kubernetes

### 使用 Helm

```bash
helm repo add omnidev https://charts.omnidev.dev
helm install knowledge-engine m2lan/knowledge-engine \
  --namespace knowledge-engine \
  --create-namespace \
  --values values.yaml
```

### 手动部署

```bash
kubectl apply -f deploy/k8s/
```

## 生产环境变量

```bash
# 数据库
DB_HOST=your-production-db
DB_PORT=5432
DB_USER=knowledge
DB_PASSWORD=<strong-password>
DB_NAME=knowledge

# Redis
REDIS_HOST=your-production-redis
REDIS_PORT=6379
REDIS_PASSWORD=<strong-password>

# 嵌入
EMBEDDING_PROVIDER=openai
EMBEDDING_API_KEY=sk-...
EMBEDDING_MODEL=text-embedding-3-small

# 存储
STORAGE_TYPE=minio
STORAGE_S3_BUCKET=knowledge
STORAGE_S3_ENDPOINT=minio.internal:9000
STORAGE_S3_ACCESS_KEY=<access-key>
STORAGE_S3_SECRET_KEY=<secret-key>

# 认证
AUTH_TYPE=jwt
JWT_SECRET=<strong-secret>

# 服务器
SERVER_PORT=8083
GIN_MODE=release
```

## 健康检查

```bash
curl http://localhost:8083/health
```

## 监控

知识引擎在 `/metrics` 端点暴露 Prometheus 指标。

```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'knowledge-engine'
    static_configs:
      - targets: ['knowledge-engine:8083']
```
