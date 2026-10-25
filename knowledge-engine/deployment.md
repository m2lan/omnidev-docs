# Deployment

## Docker

### Build Image

Run from the `knowledge-engine` module root (the build context must include `go.mod`):

```bash
docker build -f deploy/docker/Dockerfile -t knowledge-engine .
```

### Run Container

```bash
docker run -d \
  --name knowledge-engine \
  -p 8083:8083 \
  -e DATABASE_URL='postgres://postgres:postgres@host.docker.internal:5432/knowledge?sslmode=disable' \
  -e REDIS_URL='redis://host.docker.internal:6379/0' \
  -e TIKA_ENDPOINT='http://host.docker.internal:9998' \
  -e EMBEDDING_API_KEY='sk-...' \
  knowledge-engine
```

The engine creates the `vector` extension, runs migrations, and resolves the embedding
column on startup. To use an external Tika server, set `TIKA_ENDPOINT`; without Tika,
binary formats (PDF/DOCX/PPTX/XLSX) cannot be parsed — set `PARSER_TYPE=native` if you only
ingest plain text.

## Docker Compose

```bash
export EMBEDDING_API_KEY=sk-...
docker-compose -f deploy/docker/docker-compose.yml up -d
```

This starts:

- PostgreSQL 16 with pgvector
- Redis 7
- Apache Tika (`apache/tika:latest`, port 9998)
- Knowledge Engine (`:8083`)

Compose defaults to no-auth local trial mode. To protect the API, set `AUTH_TYPE=apikey`
and `API_KEY=<secret>` (or `AUTH_TYPE=jwt` and `JWT_SECRET=<secret>`):

```bash
export AUTH_TYPE=apikey
export API_KEY=$(openssl rand -hex 24)
docker-compose -f deploy/docker/docker-compose.yml up -d

curl -X POST http://localhost:8083/api/v1/knowledge \
  -H "X-API-Key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "Production KB", "chunk_size": 512, "chunk_overlap": 50}'
```

## Production Environment Variables

```bash
# Database
DATABASE_URL=postgres://knowledge:<password>@db.internal:5432/knowledge?sslmode=require

# Cache (optional; without it each replica caches in memory)
REDIS_URL=redis://:<password>@redis.internal:6379/0
SEARCH_CACHE_TTL=60s

# Embedding
EMBEDDING_PROVIDER=openai
EMBEDDING_API_KEY=sk-...
EMBEDDING_MODEL=text-embedding-3-small
# EMBEDDING_DIMENSIONS=1536

# Parser
PARSER_TYPE=tika
TIKA_ENDPOINT=http://tika.internal:9998
TIKA_TIMEOUT=60s

# Storage
STORAGE_TYPE=minio
STORAGE_BUCKET=knowledge
STORAGE_ENDPOINT=minio.internal:9000
STORAGE_ACCESS_KEY=<access-key>
STORAGE_SECRET_KEY=<secret-key>
STORAGE_USE_SSL=true

# Auth
AUTH_TYPE=jwt
JWT_SECRET=<strong-secret>
JWT_ISSUER=knowledge-engine

# Server
SERVER_ADDRESS=:8083
SERVER_WRITE_TIMEOUT=300s
```

Run at least one replica with migrations enabled (the default). `SKIP_MIGRATIONS=true` is
useful for additional replicas or for deployments where schema changes are applied by a
separate job.

## Health Check

```bash
curl http://localhost:8083/health
```

The health endpoint is unauthenticated. It reports process liveness; it does not probe
PostgreSQL, Redis, or Tika. Check your orchestrator logs or a real API call (for example
listing knowledge bases) for dependency health.

## Notes

- Use a pgvector-enabled PostgreSQL image (`pgvector/pgvector:pg16` or newer). A plain
  `postgres` image will fail at `CREATE EXTENSION vector`.
- All replicas must use the same embedding model and dimensions for a given knowledge base.
- HNSW indexes are skipped for embeddings above 2000 dimensions.
- Uploaded documents are processed asynchronously; poll the document status until `ready`
  or `failed` before expecting search results.
