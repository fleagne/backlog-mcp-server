import type { Tool } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { IssueParamsSchema, IssuesParamsSchema } from "../core/schema.js";

function convertZodToJsonSchema(schema: z.ZodType<unknown>) {
	const isIssuesParamsSchema = schema === IssuesParamsSchema;
	const isIssueParamsSchema = schema === IssueParamsSchema;

	if (isIssuesParamsSchema) {
		return {
			type: "object" as const,
			properties: {
				offset: {
					type: "number",
					description: "Offset for pagination",
					default: 0,
				},
				count: {
					type: "number",
					description: "Number of results (1-100, default 20)",
					default: 20,
					minimum: 1,
					maximum: 100,
				},
				keyword: {
					type: "string",
					description: "Keyword for searching",
				},
				sort: {
					type: "string",
					description: "Attribute name for sorting",
					enum: [
						"issueType",
						"category",
						"version",
						"milestone",
						"summary",
						"status",
						"priority",
						"attachment",
						"sharedFile",
						"created",
						"createdUser",
						"updated",
						"updatedUser",
						"assignee",
						"startDate",
						"dueDate",
						"estimatedHours",
						"actualHours",
						"childIssue",
					],
				},
				order: {
					type: "string",
					description: "Sort order",
					enum: ["asc", "desc"],
					default: "desc",
				},
				statusId: {
					type: "array",
					description: "Status ids",
					items: {
						type: "number",
					},
				},
				assigneeId: {
					type: "array",
					description: "Assignee ids",
					items: {
						type: "number",
					},
				},
				createdSince: {
					type: "string",
					description: "Start date of created date (YYYY-MM-DD format)",
				},
				createdUntil: {
					type: "string",
					description: "End date of created date (YYYY-MM-DD format)",
				},
				priorityId: {
					type: "array",
					description: "Priority ids",
					items: {
						type: "number",
					},
				},
				projectId: {
					type: "array",
					description: "Project ids",
					items: {
						type: "number",
					},
				},
			},
		};
	}

	if (isIssueParamsSchema) {
		return {
			type: "object" as const,
			properties: {
				issueIdOrKey: {
					type: "string",
					description: "Issue id or key",
				},
			},
			required: ["issueIdOrKey"],
		};
	}

	const properties: Record<string, unknown> = {};
	const required: string[] = [];

	if (schema instanceof z.ZodObject) {
		try {
			const shape = (schema as z.ZodObject<z.ZodRawShape>).shape;
			if (shape && typeof shape === "object") {
				for (const [key, value] of Object.entries(shape)) {
					const fieldSchema = value as z.ZodTypeAny;
					const propertySchema: Record<string, unknown> = { type: "string" };

					// Try to extract description
					const description = (fieldSchema as z.ZodType<unknown>)._def
						?.description;
					if (description) {
						propertySchema.description = description;
					}

					// Check if required
					if (!(fieldSchema instanceof z.ZodOptional)) {
						required.push(key);
					}

					// Extract type information
					if (
						fieldSchema instanceof z.ZodNumber ||
						(fieldSchema instanceof z.ZodOptional &&
							fieldSchema._def.innerType instanceof z.ZodNumber)
					) {
						propertySchema.type = "number";
					} else if (
						fieldSchema instanceof z.ZodBoolean ||
						(fieldSchema instanceof z.ZodOptional &&
							fieldSchema._def.innerType instanceof z.ZodBoolean)
					) {
						propertySchema.type = "boolean";
					} else if (
						fieldSchema instanceof z.ZodArray ||
						(fieldSchema instanceof z.ZodOptional &&
							fieldSchema._def.innerType instanceof z.ZodArray)
					) {
						propertySchema.type = "array";
						propertySchema.items = { type: "string" };

						// Try to infer array item type
						const arraySchema =
							fieldSchema instanceof z.ZodOptional
								? fieldSchema._def.innerType
								: fieldSchema;
						const itemType = (arraySchema as z.ZodArray<z.ZodTypeAny>)._def
							?.type;
						if (itemType instanceof z.ZodNumber) {
							propertySchema.items = { type: "number" };
						} else if (itemType instanceof z.ZodBoolean) {
							propertySchema.items = { type: "boolean" };
						}
					} else if (
						fieldSchema instanceof z.ZodEnum ||
						(fieldSchema instanceof z.ZodOptional &&
							fieldSchema._def.innerType instanceof z.ZodEnum)
					) {
						propertySchema.type = "string";
						const enumSchema =
							fieldSchema instanceof z.ZodOptional
								? fieldSchema._def.innerType
								: fieldSchema;
						propertySchema.enum =
							(enumSchema as z.ZodEnum<[string, ...string[]]>)._def?.values ||
							[];
					}

					// Extract default value
					if (fieldSchema instanceof z.ZodDefault) {
						const defaultValue = (
							fieldSchema as z.ZodDefault<z.ZodTypeAny>
						)._def?.defaultValue?.();
						if (defaultValue !== undefined) {
							propertySchema.default = defaultValue;
						}
					} else if (
						fieldSchema instanceof z.ZodOptional &&
						fieldSchema._def.innerType instanceof z.ZodDefault
					) {
						const defaultValue = (
							fieldSchema._def.innerType as z.ZodDefault<z.ZodTypeAny>
						)._def?.defaultValue?.();
						if (defaultValue !== undefined) {
							propertySchema.default = defaultValue;
						}
					}

					properties[key] = propertySchema;
				}
			}
		} catch (e) {
			console.warn("Failed to extract schema properties:", e);
		}
	}

	return {
		type: "object" as const,
		properties,
		...(required.length > 0 ? { required } : {}),
	};
}

const createTool = (
	name: string,
	description: string,
	schema: z.ZodType<any>,
): Tool => {
	const inputSchema = convertZodToJsonSchema(schema);

	return {
		name,
		description,
		inputSchema,
	};
};

export const ISSUES_TOOL: Tool = createTool(
	"backlog_search_issues",
	"Performs list issue search using the Backlog Issues Search API. " +
		"Supports pagination, content filtering. " +
		"Maximum 20 results per request, with offset for pagination.",
	IssuesParamsSchema,
);

export const ISSUE_TOOL: Tool = createTool(
	"backlog_search_issue",
	"Performs an issue search using the Backlog Issue Search API.",
	IssueParamsSchema,
);

export const ALL_TOOLS: Tool[] = [ISSUES_TOOL, ISSUE_TOOL];
