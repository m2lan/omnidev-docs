# MCP 服务

Knowledge Engine 可以作为 [Model Context Protocol](https://modelcontextprotocol.io) 服务使用，
Claude Desktop、Cursor、VS Code 等 MCP 客户端可以通过工具调用检索和管理知识库。

MCP 服务复用同一个引擎、数据库、认证与权限规则，支持两种传输方式。

## 传输方式

| 传输方式 | 端点 / 命令 | 身份 |
|----------|-------------|------|
| Streamable HTTP | 主服务 `POST /mcp`（`:8083`） | JWT、API Key 或 noop，与 REST 相同 |
| stdio | `./cmd/mcp` | `MCP_USER_ID` 环境变量 |

HTTP 传输是无状态的：每次 POST 携带一条 JSON-RPC 2.0 消息或批量消息并返回 JSON，
通知返回 `202 Accepted`。实现的协议版本为 `2024-11-05`。

## stdio 配置

构建二进制并在 MCP 客户端中配置：

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

`MCP_USER_ID` 默认取 `DEFAULT_USER_ID`。数据库、Embedding、解析器、存储和 Redis 相关变量
与 [配置说明](/zh/knowledge-engine/configuration) 一致。

## HTTP 配置

```bash
AUTH='Authorization: Bearer <jwt>'   # 或 X-API-Key；noop 模式可为空

curl -X POST http://localhost:8083/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -H "$AUTH" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"my-client","version":"1.0"}}}'

curl -X POST http://localhost:8083/mcp \
  -H "Content-Type: application/json" -H "$AUTH" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/list"}'
```

CORS 允许 `Accept`、`Authorization`、`Content-Type`、`X-API-Key`、`Mcp-Session-Id` 和
`MCP-Protocol-Version` 请求头。

## 工具

| 工具 | 参数 | 返回 |
|------|------|------|
| `knowledge_search` | `knowledge_base_id`、`query`、`top_k`、`min_score` | 匹配的分块、文档 ID 与归一化分数 |
| `knowledge_list_bases` | `page`、`page_size` | 当前用户的知识库 |
| `knowledge_get_base` | `knowledge_base_id` | 元数据与统计信息 |
| `knowledge_create_base` | `name`、`description`、`chunk_size`、`chunk_overlap` | 新建的知识库 |
| `knowledge_list_documents` | `knowledge_base_id`、`page`、`page_size` | 文档及入库状态 |
| `knowledge_ingest_text` | `knowledge_base_id`、`content`、`filename` | 已接收的文档；解析异步执行 |

工具结果以 JSON 字符串放在 `text` 内容块中。工具级失败返回 `isError: true`；
协议级失败使用 JSON-RPC error 对象。

调用示例：

```bash
curl -X POST http://localhost:8083/mcp \
  -H "Content-Type: application/json" -H "$AUTH" \
  -d '{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "tools/call",
    "params": {
      "name": "knowledge_search",
      "arguments": {"knowledge_base_id": "<kb_id>", "query": "如何重置密码", "top_k": 5}
    }
  }'
```

## 在 OmniDev 中使用

OmniDev 的 chat 服务可以直接调用这个端点。在 chat 服务上设置：

```bash
MCP_ENABLED=true
MCP_SERVERS='[{"name":"knowledge","url":"http://knowledge-engine:8083/mcp","api_key":""}]'
```

chat 服务会执行 `initialize`、获取工具列表并交给模型调用。工具名唯一时原样暴露；
两个服务提供同名工具时，后注册的会暴露为 `<服务名>__<工具名>`（例如
`knowledge__knowledge_search`）。
