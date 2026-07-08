# 快速开始

## 前置要求

- Go 1.22+
- Node.js 20+
- Docker & Docker Compose
- PostgreSQL 16
- Redis 7

## 安装

### 1. 克隆仓库

```bash
git clone https://github.com/m2lan/omnidev-platform.git
cd omnidev-platform
```

### 2. 启动基础设施

```bash
docker compose up -d postgres redis kafka minio elasticsearch
```

### 3. 运行数据库迁移

```bash
go run cmd/migrate/main.go up
```

### 4. 启动后端

```bash
go run cmd/server/main.go
```

### 5. 启动前端

```bash
cd apps/web
npm install
npm run dev
```

## 配置说明

参见[配置说明](/zh/platform/configuration)了解环境变量和设置。
