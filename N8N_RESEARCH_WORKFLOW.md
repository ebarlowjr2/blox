# N8N Deep Research Workflow Setup

## Overview
This document describes how to set up the N8N workflow to handle deep research requests from the BLOX frontend.

## Workflow Structure

### 1. Webhook Trigger
- **Node Type**: Webhook
- **Method**: POST
- **Path**: `/api/chat`
- **Response Mode**: Respond to Webhook

### 2. Request Analysis
- **Node Type**: Code (JavaScript)
- **Purpose**: Analyze incoming request to determine if it's a research request
- **Code**:
```javascript
// Check if this is a research request
const message = $json.message;
const requestType = $json.requestType || 'chat';

if (requestType === 'research') {
  return [{
    json: {
      isResearch: true,
      query: message,
      originalMessage: message
    }
  }];
} else {
  return [{
    json: {
      isResearch: false,
      message: message
    }
  }];
}
```

### 3. Research Branch
- **Node Type**: IF
- **Condition**: `{{ $json.isResearch === true }}`

### 4. Brave Search API Call
- **Node Type**: HTTP Request
- **Method**: GET
- **URL**: `https://api.search.brave.com/res/v1/web/search`
- **Headers**:
  - `Accept`: `application/json`
  - `X-Subscription-Token`: `{{ $env.BRAVE_SEARCH_API_KEY }}`
- **Query Parameters**:
  - `q`: `{{ $json.query }}`
  - `count`: `10`
  - `mkt`: `en-US`

### 5. OpenAI Summarization
- **Node Type**: OpenAI
- **Model**: gpt-4
- **System Message**: "You are a research assistant. Summarize search results comprehensively."
- **User Message**: Template combining query and search results

### 6. Format Response
- **Node Type**: Code (JavaScript)
- **Purpose**: Format the final response with summary and sources

## Environment Variables Required
- `BRAVE_SEARCH_API_KEY`: Your Brave Search API key
- `OPENAI_API_KEY`: Your OpenAI API key

## Setup Instructions
1. Import this workflow into your N8N instance
2. Configure the webhook URL to match your BLOX deployment
3. Set up the required environment variables
4. Test the workflow with sample research requests

## Testing the Workflow

### Test Messages
- "research AI developments"
- "/search quantum computing"
- "find information about climate change"

### Expected Response Format
```json
{
  "response": "Comprehensive summary of search results...",
  "sources": [
    {
      "title": "Article Title",
      "url": "https://example.com",
      "description": "Article description"
    }
  ],
  "researchSummary": "Additional summary if needed"
}
```

## Troubleshooting
- Verify API keys are correctly set in N8N environment variables
- Check webhook URL configuration matches BLOX deployment
- Test individual nodes to isolate issues
- Monitor N8N logs for error messages
