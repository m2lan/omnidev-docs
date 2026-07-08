# 部署指南

## Docker

### 构建镜像

```bash
docker build -t omnidev-platform .
```

### 运行容器

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

这将启动所有服务，包括：
- PostgreSQL
- Redis
- Kafka
- MinIO
- Elasticsearch
- OmniDev 平台

## Kubernetes

### 使用 Helm

```bash
helm repo add omnidev https://charts.omnidev.dev
helm install omnidev m2lan/omnidev-platform \
  --namespace omnidev \
  --create-namespace \
  --values values.yaml
```

### 手动部署

```bash
kubectl apply -f deploy/k8s/
```

## 环境特定配置

- `deploy/k8s/dev/` — 开发环境
- `deploy/k8s/staging/` — 预发布环境
- `deploy/k8s/prod/` — 生产环境
