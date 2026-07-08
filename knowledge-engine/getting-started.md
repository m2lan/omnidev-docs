# Getting Started

## Prerequisites

- Go 1.22+
- PostgreSQL 16 with pgvector extension
- Redis 7

## Installation

### 1. Docker Compose (Recommended)

```bash
# Clone the repo
git clone https://github.com/m2lan/knowledge-engine.git
cd knowledge-engine

# Set your embedding API key
export EMBEDDING_API_KEY=sk-...

# Start all services
docker-compose -f deploy/docker/docker-compose.yml up -d

# Verify it's running
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

    // Create a knowledge base
    kb, _ := engine.CreateKnowledgeBase(ctx, "user-id", knowledge.CreateKBInput{
        Name: "Product Documentation",
    })

    // Upload a document
    file, _ := os.Open("manual.pdf")
    defer file.Close()
    doc, _ := engine.UploadDocument(ctx, "user-id", kb.ID.String(), "manual.pdf", fileSize, file)

    // Search
    results, _ := engine.Search(ctx, "user-id", kb.ID.String(), "how to reset password", 5)
    for _, r := range results {
        fmt.Printf("[%.3f] %s\n", r.Score, r.Chunk.Content[:100])
    }
}
```

### 3. Embed into Existing Go Application

```go
import knowledge "github.com/m2lan/knowledge-engine"

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
