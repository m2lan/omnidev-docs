# API 参考

## 基础 URL 与认证

```text
http://localhost:9090/api/v1
```

注册、登录、刷新令牌和 OAuth 路由公开；以下接口需要 JWT Bearer token：

```bash
curl -H "Authorization: Bearer <token>" http://localhost:9090/api/v1/conversations
```

公开认证路由为 `POST /auth/register`、`POST /auth/login`、`POST /auth/refresh`、`GET /auth/oauth/:provider` 和 `GET /auth/callback/:provider`。`/health` 和 `/ready` 健康检查位于 `/api/v1` 之外。

下文路径均相对于 `/api/v1`。

## 聊天与文件

| 方法 | 路径 | 用途 |
|------|------|------|
| `GET`、`POST` | `/conversations` | 列出或创建会话 |
| `GET`、`PATCH`、`DELETE` | `/conversations/:id` | 读取、更新或删除会话 |
| `GET` | `/conversations/:id/messages` | 列出消息 |
| `POST` | `/conversations/:id/messages` | 发送消息并等待响应 |
| `POST` | `/conversations/:id/messages/stream` | 发送消息并接收 SSE 流 |
| `GET` | `/models` | 列出可用模型 |
| `POST` | `/images/generate` | 生成图片 |
| `POST` | `/upload` | 上传附件 |
| `GET`、`DELETE` | `/attachments/:id` | 下载或删除附件 |

非流式消息示例：

```bash
curl -X POST http://localhost:9090/api/v1/conversations/$CONVERSATION_ID/messages \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"content":"你好，请介绍一下你的能力。"}'
```

流式响应使用独立的 `/messages/stream` 路径，而不是 `stream` 字段。消息请求可通过附件 ID 引用附件。

用户级提供商配置接口包括 `GET`/`POST /user/ai-configs`、`GET`/`PUT`/`DELETE /user/ai-configs/:id`、`PUT /user/ai-configs/:id/default` 和 `POST /user/ai-configs/:id/test`。

## 知识库

| 方法 | 路径 | 用途 |
|------|------|------|
| `GET`、`POST` | `/knowledge` | 列出或创建知识库 |
| `GET`、`PATCH`、`DELETE` | `/knowledge/:id` | 管理知识库 |
| `GET`、`POST` | `/knowledge/:id/documents` | 列出文档或上传文档 |
| `DELETE` | `/knowledge/:id/documents/:doc_id` | 删除文档 |
| `POST` | `/knowledge/:id/search` | 在知识库中执行相似度检索 |

文档上传使用 multipart form data。聊天可将检索结果用作 RAG 上下文。

## 后台 Agent

只有 `SANDBOX_ENABLED=true` 且 Docker 可用时，Agent 路由才存在。

| 方法 | 路径 | 用途 |
|------|------|------|
| `GET`、`POST` | `/agents` | 列出或创建 Agent |
| `GET`、`PATCH`、`DELETE` | `/agents/:id` | 管理 Agent |
| `POST` | `/agents/:id/run` | 启动异步运行 |
| `GET` | `/agents/:id/runs` | 列出 Agent 的运行 |
| `GET` | `/agent-runs/:run_id` | 获取运行的 `{run, steps}` |
| `POST` | `/agent-runs/:run_id/cancel` | 取消运行 |

启动运行：

```bash
curl -X POST http://localhost:9090/api/v1/agents/$AGENT_ID/run \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"task":"检查工作区并总结其中的文件。"}'
```

轮询 `GET /agent-runs/:run_id` 可获取状态、结果和持久化步骤。自动创建 Pull Request 不是当前 API 能力。

## 响应

成功的 JSON 响应通常将负载放在 `data` 中；列表接口还可能包含 `meta` 分页信息。错误使用结构化 `error` 对象和相应 HTTP 状态码。SSE 流式响应使用流式接口的事件格式，而非 JSON 外层结构。
