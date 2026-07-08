# 快速开始

## 前置要求

- Go 1.22+
- PostgreSQL 16（带 pgvector 扩展）
- Redis 7

## 安装

### 1. Docker Compose（推荐）

```bash
# 克隆仓库
git clone https://github.com/m2lan/knowledge-engine.git
cd knowledge-engine

# 设置嵌入 API 密钥
export EMBEDDING_API_KEY=sk-...

# 启动所有服务
docker-compose -f deploy/docker/docker-compose.yml up -d

# 验证运行状态
curl http://localhost:8083/health
```

### 2. Go SDK

```go
package main

import (
    "context"
    "fmt"
    "os"

    knowledge "github.com/m2lan/knowledge-engine"
)

func main() {
    engine, err := knowledge.New(knowledge.Config{
        DatabaseURL: "postgres://postgres:postgres@localhost:5432/knowledge?sslmode=disable",
        Embedding: knowledge.EmbeddingConfig{
            Provider: "openai",
            APIKey:   "sk-...",
        },
    })
    if err != nil {
        panic(err)
    }
    defer engine.Close()

    ctx := context.Background()

    // 创建知识库
    kb, _ := engine.CreateKnowledgeBase(ctx, "user-id", knowledge.CreateKBInput{
        Name: "产品文档",
    })

    // 上传文档
    file, _ := os.Open("manual.pdf")
    defer file.Close()
    doc, _ := engine.UploadDocument(ctx, "user-id", kb.ID.String(), "manual.pdf", fileSize, file)

    // 搜索
    results, _ := engine.Search(ctx, "user-id", kb.ID.String(), "如何重置密码", 5)
    for _, r := range results {
        fmt.Printf("[%.3f] %s\n", r.Score, r.Chunk.Content[:100])
    }
}
```

### 3. 嵌入到现有 Go 应用

```go
import knowledge "github.com/m2lan/knowledge-engine"

// 初始化引擎
engine, _ := knowledge.New(knowledge.Config{
    DatabaseURL: os.Getenv("DATABASE_URL"),
    Embedding: knowledge.EmbeddingConfig{
        Provider: "openai",
        APIKey:   os.Getenv("OPENAI_API_KEY"),
    },
})

// 在应用中使用引擎
results, _ := engine.Search(ctx, userID, kbID, query, 10)
```

## 配置说明

参见[配置说明](/zh/knowledge-engine/configuration)了解环境变量和设置。
