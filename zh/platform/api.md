# API 参考

## 基础 URL

```
http://localhost:8080/api/v1
```

## 认证

所有 API 请求需要通过 Bearer token 进行认证：

```bash
curl -H "Authorization: Bearer <token>" http://localhost:8080/api/v1/...
```

## 接口

### 聊天

#### 创建会话

```
POST /api/v1/chat/conversations
```

**请求体：**
```json
{
  "title": "我的会话",
  "model": "gpt-4"
}
```

#### 发送消息

```
POST /api/v1/chat/conversations/{id}/messages
```

**请求体：**
```json
{
  "content": "你好，你能帮我什么？",
  "stream": true
}
```

### 知识库

#### 获取知识库列表

```
GET /api/v1/knowledge-bases
```

#### 创建知识库

```
POST /api/v1/knowledge-bases
```

**请求体：**
```json
{
  "name": "我的知识库",
  "description": "知识库描述"
}
```

### 搜索

#### 搜索文档

```
POST /api/v1/search
```

**请求体：**
```json
{
  "query": "搜索关键词",
  "knowledge_base_id": "kb-123",
  "top_k": 10
}
```

## 响应格式

所有响应遵循以下格式：

```json
{
  "code": 0,
  "message": "success",
  "data": { ... }
}
```

## 错误码

| 错误码 | 说明 |
|--------|------|
| 0 | 成功 |
| 1001 | 请求无效 |
| 1002 | 未授权 |
| 1003 | 未找到 |
| 5000 | 服务器内部错误 |
