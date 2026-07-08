# API Reference

## Base URL

```
http://localhost:8080/api/v1
```

## Authentication

All API requests require authentication via Bearer token:

```bash
curl -H "Authorization: Bearer <token>" http://localhost:8080/api/v1/...
```

## Endpoints

### Chat

#### Create Conversation

```
POST /api/v1/chat/conversations
```

**Request Body:**
```json
{
  "title": "My Conversation",
  "model": "gpt-4"
}
```

#### Send Message

```
POST /api/v1/chat/conversations/{id}/messages
```

**Request Body:**
```json
{
  "content": "Hello, how can you help me?",
  "stream": true
}
```

### Knowledge Base

#### List Knowledge Bases

```
GET /api/v1/knowledge-bases
```

#### Create Knowledge Base

```
POST /api/v1/knowledge-bases
```

**Request Body:**
```json
{
  "name": "My Knowledge Base",
  "description": "Description of the KB"
}
```

### Search

#### Search Documents

```
POST /api/v1/search
```

**Request Body:**
```json
{
  "query": "search query",
  "knowledge_base_id": "kb-123",
  "top_k": 10
}
```

## Response Format

All responses follow this format:

```json
{
  "code": 0,
  "message": "success",
  "data": { ... }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 0 | Success |
| 1001 | Invalid request |
| 1002 | Unauthorized |
| 1003 | Not found |
| 5000 | Internal server error |
