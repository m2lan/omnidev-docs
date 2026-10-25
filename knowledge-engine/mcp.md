# MCP Server

Knowledge Engine can be used as a [Model Context Protocol](https://modelcontextprotocol.io) server,
which lets MCP clients such as Claude Desktop, Cursor, and VS Code search and manage knowledge bases
through tool calls.

The MCP server reuses the same engine, database, authentication, and ownership rules as the REST API.
It supports two transports.

## Transports

| Transport | Endpoint / command | Identity |
|-----------|--------------------|----------|
| Streamable HTTP | `POST /mcp` on the main server (`:8083`) | JWT, API key, or noop — same as REST |
| stdio | `./cmd/mcp` | `MCP_USER_ID` environment variable |

The HTTP transport is stateless. Each POST contains one JSON-RPC 2.0 message or a batch and returns
JSON; notifications return `202 Accepted`. The implemented protocol version is `2024-11-05`.

## stdio setup

Build the binary and point your MCP client at it:

```bash
go build -o bin/knowledge-mcp ./cmd/mcp
```

```json
{
  "mcpServers": {
    "knowledge": {
      "command": "/absolute/path/to/knowledge-mcp",
      "env": {
        "DATABASE_URL": "postgres://postgres:postgres@localhost:5432/knowledge?sslmode=disable",
        "EMBEDDING_PROVIDER": "openai",
        "EMBEDDING_API_KEY": "sk-...",
        "MCP_USER_ID": "00000000-0000-0000-0000-000000000001"
      }
    }
  }
}
```

`MCP_USER_ID` defaults to `DEFAULT_USER_ID`. All database, embedding, parser, storage, and Redis
variables from [Configuration](/knowledge-engine/configuration) apply here as well.

## HTTP setup

```bash
AUTH='Authorization: Bearer <jwt>'   # or X-API-Key, or empty in noop mode

curl -X POST http://localhost:8083/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -H "$AUTH" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"my-client","version":"1.0"}}}'

curl -X POST http://localhost:8083/mcp \
  -H "Content-Type: application/json" -H "$AUTH" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/list"}'
```

CORS allows `Accept`, `Authorization`, `Content-Type`, `X-API-Key`, `Mcp-Session-Id`, and
`MCP-Protocol-Version` headers.

## Tools

| Tool | Arguments | Result |
|------|-----------|--------|
| `knowledge_search` | `knowledge_base_id`, `query`, `top_k`, `min_score` | Matching chunks with document IDs and normalized scores |
| `knowledge_list_bases` | `page`, `page_size` | Knowledge bases owned by the caller |
| `knowledge_get_base` | `knowledge_base_id` | Metadata and statistics |
| `knowledge_create_base` | `name`, `description`, `chunk_size`, `chunk_overlap` | Created knowledge base |
| `knowledge_list_documents` | `knowledge_base_id`, `page`, `page_size` | Documents and ingestion status |
| `knowledge_ingest_text` | `knowledge_base_id`, `content`, `filename` | Accepted document; parsing runs asynchronously |

Tool output is returned as a JSON string in the `text` content block. Tool-level failures set
`isError: true`; protocol-level failures use JSON-RPC error objects.

Example tool call:

```bash
curl -X POST http://localhost:8083/mcp \
  -H "Content-Type: application/json" -H "$AUTH" \
  -d '{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "tools/call",
    "params": {
      "name": "knowledge_search",
      "arguments": {"knowledge_base_id": "<kb_id>", "query": "reset password", "top_k": 5}
    }
  }'
```

## Using it from OmniDev

The OmniDev chat service can consume this endpoint directly. Set `MCP_ENABLED=true` and
`MCP_SERVERS` on the chat service:

```bash
MCP_ENABLED=true
MCP_SERVERS='[{"name":"knowledge","url":"http://knowledge-engine:8083/mcp","api_key":""}]'
```

The chat service calls `initialize`, lists tools, and exposes them to the model. Tool names are
used as-is when unique. When two servers advertise the same tool name, the later server's copy is
exposed as `<server-name>__<tool-name>` (for example `knowledge__knowledge_search`).
