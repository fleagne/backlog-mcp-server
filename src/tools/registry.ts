import type { Tool } from "@modelcontextprotocol/sdk/types.js";
import { ALL_TOOLS } from "./toolDefinitions.js";

class ToolRegistry {
	private tools: Map<string, Tool>;

	constructor(initialTools: Tool[] = []) {
		this.tools = new Map();

		for (const tool of initialTools) {
			this.registerTool(tool);
		}
	}

	registerTool(tool: Tool): void {
		if (this.tools.has(tool.name)) {
			console.warn(
				`Tool with name "${tool.name}" is already registered. Overwriting...`,
			);
		}

		this.tools.set(tool.name, tool);
	}

	getAllTools(): Tool[] {
		return Array.from(this.tools.values());
	}

	getTool(name: string): Tool | undefined {
		return this.tools.get(name);
	}

	hasTool(name: string): boolean {
		return this.tools.has(name);
	}
}

export const toolRegistry = new ToolRegistry(ALL_TOOLS);
