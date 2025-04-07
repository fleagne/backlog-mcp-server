# Backlog MCP Server

An MCP server implementation that integrates the Backlog API.

## Tools

### Project API

- **backlog_get_projects**
  - Execute projects get with pagination and filtering
- **backlog_get_project**
  - Execute project gets with project id or key

### Issue API

- **backlog_get_issues**
  - Execute issues get with pagination and filtering
- **backlog_get_issue**
  - Execute issue gets with issue id or key
- **backlog_add_issue**
  - Execute issue add with issue data
- **backlog_update_issue**
  - Execute issue update with issue data
- **backlog_delete_issue**
  - Execute issue delete with issue id or key

### Wiki API

- **backlog_get_wikis**
  - Execute wikis get with keyword
- **backlog_get_wiki**
  - Execute wiki gets with wiki id or key
- **backlog_add_wiki**
  - Execute wiki add with wiki data
- **backlog_update_wiki**
  - Execute wiki update with wiki data
- **backlog_delete_wiki**
  - Execute wiki delete with wiki id or key

## Configuration

### Getting an API Key

1. Sign up for a [Backlog](https://backlog.com)
2. Choose a plan (Free plan available [here](https://registerjp.backlog.com/trial/with-new-account/plan/11))
3. Generate your API key from the individual settings [help](https://support-ja.backlog.com/hc/ja/articles/360035641754-API%E3%81%AE%E8%A8%AD%E5%AE%9A)

### Environment Variables

This server requires the following environment variables:

- Required:
  - `BACKLOG_API_KEY`: Your Backlog API key
  - `BACKLOG_SPACE_ID`: Your Backlog space ID
- Optional:
  - `BACKLOG_BASE_URL`: Your Backlog base URL (default: `https://{your-space-id}.backlog.com/api/v2`)

### Usage with Claude Desktop

Add this to your `claude_desktop_config.json`:

#### NPX

```json
{
  "mcpServers": {
    "backlog": {
      "command": "npx",
      "args": [
        "-y",
        "backlog-mcp-server"
      ],
      "env": {
        "BACKLOG_API_KEY": "YOUR_API_KEY_HERE",
        "BACKLOG_SPACE_ID": "YOUR_SPACE_ID_HERE"
      }
    }
  }
}
```

#### Docker

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

## Development

### Installation

```bash
npm install
```

### Build

```bash
npm run build
```

### Debug

```bash
npm run debug
```

### Running Tests

T.B.D

### Docker Build

```bash
docker build -t mcp/backlog -f Dockerfile .
```

## Extending the Server

To add new tools:

1. Define a new Zod schema in `src/core/schema.ts`
2. Add a new tool definition in `src/tools/toolDefinitions.ts` and include it in `ALL_TOOLS`
3. Create a new handler in `src/tools/handlers.ts` and register it in `toolHandlers`
4. Implement business logic in a service in the `src/services/` directory

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
