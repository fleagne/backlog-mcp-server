# Backlog MCP Server

An MCP server implementation that integrates the Backlog API.

## Features

- **Issue Search**: Search for issues using the Backlog API

## Tools

- **backlog_search_issues**
  - Execute issues search with pagination and filtering
- **backlog_search_issue**
  - Execute issue searches with issue id or key

## Configuration

### Getting an API Key

1. Sign up for a [Backlog](https://backlog.com)
2. Choose a plan (Free plan available [here](https://registerjp.backlog.com/trial/with-new-account/plan/11))
3. Generate your API key from the individual settings [help](https://support-ja.backlog.com/hc/ja/articles/360035641754-API%E3%81%AE%E8%A8%AD%E5%AE%9A)

### Usage with Claude Desktop

Add this to your `claude_desktop_config.json`:

### NPX

```json
{
  "mcpServers": {
    "backlog": {
      "command": "npx",
      "args": [
        "-y",
        "@fleagne/backlog-mcp-server"
      ],
      "env": {
        "BACKLOG_API_KEY": "YOUR_API_KEY_HERE",
        "BACKLOG_SPACE_ID": "YOUR_SPACE_ID_HERE"
      }
    }
  }
}
```

### Docker

```json
{
  "mcpServers": {
    "backlog": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "BACKLOG_API_KEY=YOUR_API_KEY_HERE",
        "-e",
        "BACKLOG_SPACE_ID=YOUR_SPACE_ID_HERE",
        "mcp/backlog"
      ],
      "env": {
        "BACKLOG_API_KEY": "YOUR_API_KEY_HERE",
        "BACKLOG_SPACE_ID": "YOUR_SPACE_ID_HERE"
      }
    }
  }
}
```

## Build

Docker build:

```bash
docker build -t mcp/backlog -f Dockerfile .
```

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
