# Getting Started

## Prerequisites

- Go 1.22+
- PostgreSQL 16 with pgvector (`pgvector/pgvector:pg16`)
- Redis 7 (optional — in-memory cache is used if absent)
- Apache Tika (optional for plain text; required for PDF/DOCX/PPTX/XLSX)

## Installation

### 1. Docker Compose (Recommended)

```bash
# Clone the repo
git clone https://github.com/m2lan/knowledge-engine.git
cd knowledge-engine

# Set your embedding API key
export EMBEDDING_API_KEY=sk-...

# Start everything: PostgreSQL + pgvector, Redis, Apache Tika, Knowledge Engine
docker-compose -f deploy/docker/docker-compose.yml up -d

# Verify it's running (no-auth trial mode)
curl http://localhost:8083/health
curl -X POST http://localhost:8083/api/v1/knowledge \
  -H "Content-Type: application/json" \
  -d '{"name": "Product Documentation"}'
```

Migrations run automatically; do not apply SQL manually. To enable authentication, set
`AUTH_TYPE=apikey` with `API_KEY=<secret>` (or `AUTH_TYPE=jwt` with `JWT_SECRET=<secret>`)
and send the matching header on every API call.

### 2. Go SDK

```go
package main

import (
    "context"
    "fmt"
    "os"

    knowledge "github.com/omnidev/knowledge-engine"
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

    // Create a knowledge base
    kb, _ := engine.CreateKnowledgeBase(ctx, "user-id", knowledge.CreateKBInput{
        Name: "Product Documentation",
    })

    // Upload a document (processed asynchronously)
    file, _ := os.Open("manual.pdf")
    defer file.Close()
    info, _ := file.Stat()
    doc, _ := engine.UploadDocument(ctx, "user-id", kb.ID.String(), "manual.pdf", info.Size(), file)
    _ = doc // poll the document until status is ready/failed

    // Search
    results, _ := engine.Search(ctx, "user-id", kb.ID.String(), "how to reset password", 5)
    for _, r := range results {
        fmt.Printf("[%.3f] %s\n", r.Score, r.Chunk.Content[:100])
    }
}
```

### 3. Embed into Existing Go Application

```go
import knowledge "github.com/omnidev/knowledge-engine"

// Initialize engine
engine, _ := knowledge.New(knowledge.Config{
    DatabaseURL: os.Getenv("DATABASE_URL"),
    Embedding: knowledge.EmbeddingConfig{
        Provider: "openai",
        APIKey:   os.Getenv("OPENAI_API_KEY"),
    },
})

// Use engine in your application
results, _ := engine.Search(ctx, userID, kbID, query, 10)
```

## Configuration

See [Configuration](/knowledge-engine/configuration) for environment variables and settings.
