#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
	CallToolRequestSchema,
	ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { performIssue, performIssues } from "./api.js";
import { BACKLOG_API_KEY, BACKLOG_SPACE_ID } from "./consts.js";
import { ISSUES_TOOL, ISSUE_TOOL } from "./tools.js";
import { isIssueArgs } from "./utils.js";

if (BACKLOG_API_KEY === "" || BACKLOG_SPACE_ID === "") {
	console.error(
		"Error: BACKLOG_API_KEY or BACKLOG_SPACE_ID environment variable is required",
	);
	process.exit(1);
}

const server = new Server(
	{
		name: "example-servers/backlog",
		version: "0.1.0",
	},
	{
		capabilities: {
			tools: {},
		},
	},
);

// Tool handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({
	tools: [ISSUES_TOOL, ISSUE_TOOL],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
	try {
		const { name, arguments: args } = request.params;

		if (!args) {
			throw new Error("No arguments provided");
		}

		switch (name) {
			case "backlog_search_issues": {
				const text = await performIssues(args);
				return {
					content: [
						{
							type: "text",
							text: text,
						},
					],
					isError: false,
				};
			}
			case "backlog_search_issue": {
				if (!isIssueArgs(args)) {
					throw new Error("Invalid arguments for backlog_issue");
				}
				const { issueIdOrKey } = args;
				const text = await performIssue(issueIdOrKey);
				return {
					content: [
						{
							type: "text",
							text: text,
						},
					],
					isError: false,
				};
			}

			default:
				return {
					content: [{ type: "text", text: `Unknown tool: ${name}` }],
					isError: true,
				};
		}
	} catch (error) {
		return {
			content: [
				{
					type: "text",
					text: `Error: ${error instanceof Error ? error.message : String(error)}`,
				},
			],
			isError: true,
		};
	}
});

async function runServer() {
	const transport = new StdioServerTransport();
	await server.connect(transport);
	console.error("Backlog MCP Server running on stdio");
}

runServer().catch((error) => {
	console.error("Fatal error running server:", error);
	process.exit(1);
});
