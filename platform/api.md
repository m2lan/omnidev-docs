# API Reference

## Base URL and Authentication

```text
http://localhost:9090/api/v1
```

Registration, login, token refresh, and OAuth routes are public. The endpoints below require a JWT Bearer token:

```bash
curl -H "Authorization: Bearer <token>" http://localhost:9090/api/v1/conversations
```

Public auth routes are `POST /auth/register`, `POST /auth/login`, `POST /auth/refresh`, `GET /auth/oauth/:provider`, and `GET /auth/callback/:provider`. Health checks are available at `/health` and `/ready` outside `/api/v1`.

Paths below are relative to `/api/v1`.

## Chat and Files

| Method | Path | Purpose |
|--------|------|---------|
| `GET`, `POST` | `/conversations` | List or create conversations |
| `GET`, `PATCH`, `DELETE` | `/conversations/:id` | Read, update, or delete a conversation |
| `GET` | `/conversations/:id/messages` | List messages |
| `POST` | `/conversations/:id/messages` | Send a message and wait for the response |
| `POST` | `/conversations/:id/messages/stream` | Send a message and receive an SSE stream |
| `GET` | `/models` | List available models |
| `POST` | `/images/generate` | Generate an image |
| `POST` | `/upload` | Upload an attachment |
| `GET`, `DELETE` | `/attachments/:id` | Download or delete an attachment |

Example non-streaming message:

```bash
curl -X POST http://localhost:9090/api/v1/conversations/$CONVERSATION_ID/messages \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"content":"Hello, what can you help with?"}'
```

Streaming uses the separate `/messages/stream` endpoint, not a `stream` field. Attachments can be referenced by their IDs in message requests.

Per-user provider configurations are managed with `GET`/`POST /user/ai-configs`, `GET`/`PUT`/`DELETE /user/ai-configs/:id`, `PUT /user/ai-configs/:id/default`, and `POST /user/ai-configs/:id/test`.

## Knowledge

| Method | Path | Purpose |
|--------|------|---------|
| `GET`, `POST` | `/knowledge` | List or create knowledge bases |
| `GET`, `PATCH`, `DELETE` | `/knowledge/:id` | Manage a knowledge base |
| `GET`, `POST` | `/knowledge/:id/documents` | List documents or upload a document |
| `DELETE` | `/knowledge/:id/documents/:doc_id` | Delete a document |
| `POST` | `/knowledge/:id/search` | Run similarity search in a knowledge base |

Document upload uses multipart form data. Search results can be used as RAG context by chat.

## Background Agents

Agent routes are available only when `SANDBOX_ENABLED=true` and Docker is available.

| Method | Path | Purpose |
|--------|------|---------|
| `GET`, `POST` | `/agents` | List or create agents |
| `GET`, `PATCH`, `DELETE` | `/agents/:id` | Manage an agent |
| `POST` | `/agents/:id/run` | Start an asynchronous run |
| `GET` | `/agents/:id/runs` | List runs for an agent |
| `GET` | `/agent-runs/:run_id` | Get `{run, steps}` for a run |
| `POST` | `/agent-runs/:run_id/cancel` | Cancel a run |

Start a run:

```bash
curl -X POST http://localhost:9090/api/v1/agents/$AGENT_ID/run \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"task":"Inspect the workspace and summarize its files."}'
```

Poll `GET /agent-runs/:run_id` for status, result, and persisted steps. Pull-request delivery is not an API capability.

## Responses

Successful JSON responses generally wrap their payload in `data`; list endpoints may also include `meta` pagination. Errors use a structured `error` object with an HTTP status code. SSE streaming responses use the streaming endpoint's event format rather than the JSON envelope.
