#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
	CallToolRequestSchema,
	ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
	BACKLOG_API_KEY,
	BACKLOG_SPACE_ID,
	SERVER_NAME,
	SERVER_VERSION,
} from "./config/config.js";
import type { ToolName } from "./core/types.js";
import { ConfigurationError, formatError } from "./error/errors.js";
import { toolHandlers, toolRegistry } from "./tools/index.js";

if (BACKLOG_API_KEY === "" || BACKLOG_SPACE_ID === "") {
	throw new ConfigurationError(
		"BACKLOG_API_KEY or BACKLOG_SPACE_ID environment variable is required",
	);
}

const server = new Server(
	{
		name: SERVER_NAME,
		version: SERVER_VERSION,
	},
	{
		capabilities: {
			tools: {},
		},
	},
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
	tools: toolRegistry.getAllTools(),
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
	try {
		const { name, arguments: args } = request.params;

		if (!args) {
			throw new Error("No arguments provided");
		}

		if (!toolRegistry.hasTool(name)) {
			return {
				content: [{ type: "text", text: `Unknown tool: ${name}` }],
				isError: true,
			};
		}

		const handler = toolHandlers[name as ToolName];

		if (handler) {
			const toolResponse = await handler(args);
			return { content: toolResponse.content, isError: toolResponse.isError };
		}

		return {
			content: [{ type: "text", text: `No handler defined for tool: ${name}` }],
			isError: true,
		};
	} catch (error) {
		return {
			content: [
				{
					type: "text",
					text: `Server error: ${formatError(error)}`,
				},
			],
			isError: true,
		};
	}
});

async function runServer() {
	try {
		const transport = new StdioServerTransport();
		await server.connect(transport);
		console.error("Backlog MCP Server running on stdio");
	} catch (error) {
		console.error("Error starting server:", formatError(error));
		process.exit(1);
	}
}

runServer().catch((error) => {
	console.error("Fatal error running server:", formatError(error));
	process.exit(1);
});
