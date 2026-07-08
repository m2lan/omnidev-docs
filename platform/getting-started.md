# Getting Started

## Prerequisites

- Go 1.22+
- Node.js 20+
- Docker & Docker Compose
- PostgreSQL 16
- Redis 7

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/m2lan/omnidev-platform.git
cd omnidev-platform
```

### 2. Start Infrastructure

```bash
docker compose up -d postgres redis kafka minio elasticsearch
```

### 3. Run Database Migrations

```bash
go run cmd/migrate/main.go up
```

### 4. Start the Backend

```bash
go run cmd/server/main.go
```

### 5. Start the Frontend

```bash
cd apps/web
npm install
npm run dev
```

## Configuration

See [Configuration](/platform/configuration) for environment variables and settings.
