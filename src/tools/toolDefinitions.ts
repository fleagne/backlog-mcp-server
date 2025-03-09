import type { Tool } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import {
	AddIssueParamsSchema,
	AddWikiParamsSchema,
	DeleteIssueParamsSchema,
	DeleteWikiParamsSchema,
	IssueParamsSchema,
	IssuesParamsSchema,
	ProjectParamsSchema,
	ProjectsParamsSchema,
	UpdateIssueParamsSchema,
	UpdateWikiParamsSchema,
	WikiParamsSchema,
	WikisParamsSchema,
} from "../core/schema.js";

function convertZodToJsonSchema(schema: z.ZodType<unknown>) {
	const isProjectsParamsSchema = schema === ProjectsParamsSchema;
	const isProjectParamsSchema = schema === ProjectParamsSchema;
	const isIssuesParamsSchema = schema === IssuesParamsSchema;
	const isIssueParamsSchema = schema === IssueParamsSchema;
	const isAddIssueParamsSchema = schema === AddIssueParamsSchema;
	const isUpdateIssueParamsSchema = schema === AddIssueParamsSchema;
	const isDeleteIssueParamsSchema = schema === AddIssueParamsSchema;
	const isWikisParamsSchema = schema === WikisParamsSchema;
	const isWikiParamsSchema = schema === WikiParamsSchema;
	const isAddWikiParamsSchema = schema === AddWikiParamsSchema;
	const isUpdateWikiParamsSchema = schema === UpdateWikiParamsSchema;
	const isDeleteWikiParamsSchema = schema === DeleteWikiParamsSchema;

	if (isProjectsParamsSchema) {
		return {
			type: "object" as const,
			properties: {
				archived: {
					type: "boolean",
					description:
						"For unspecified parameters, this form returns all projects. " +
						"For false parameters, it returns unarchived projects. " +
						"For true parameters, it returns archived projects.",
				},
				all: {
					type: "boolean",
					description:
						"Only applies to administrators. " +
						"If true, it returns all projects. " +
						"If false, it returns only projects they have joined (set to false by default).",
					default: false,
				},
			},
		};
	}

	if (isProjectParamsSchema) {
		return {
			type: "object" as const,
			properties: {
				projectIdOrKey: {
					type: "string",
					description: "Project ID or Project Key",
				},
			},
			required: ["projectIdOrKey"],
		};
	}

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
					description: "Issue ID or Issue Key",
				},
			},
			required: ["issueIdOrKey"],
		};
	}

	if (isAddIssueParamsSchema) {
		return {
			type: "object" as const,
			properties: {
				projectId: {
					type: "number",
					description: "Project id",
				},
				summary: {
					type: "string",
					description: "Summary of the issue",
				},
				description: {
					type: "string",
					description: "Description of the issue",
				},
				issueTypeId: {
					type: "number",
					description: "Issue type id",
				},
				priorityId: {
					type: "number",
					description: "Priority id",
				},
				categoryId: {
					type: "number",
					description: "Category id",
				},
				versionId: {
					type: "number",
					description: "Version id",
				},
				milestoneId: {
					type: "number",
					description: "Milestone id",
				},
				assigneeId: {
					type: "number",
					description: "Assignee id",
				},
				startDate: {
					type: "string",
					description: "Start date of the issue (YYYY-MM-DD format)",
				},
				dueDate: {
					type: "string",
					description: "Due date of the issue (YYYY-MM-DD format)",
				},
				estimatedHours: {
					type: "number",
					description: "Estimated hours for the issue",
				},
				actualHours: {
					type: "number",
					description: "Actual hours for the issue",
				},
			},
			required: ["projectId", "summary", "issueTypeId", "priorityId"],
		};
	}

	if (isUpdateIssueParamsSchema) {
		return {
			type: "object" as const,
			properties: {
				issueIdOrKey: {
					type: "string",
					description: "Issue ID or Issue Key",
				},
				summary: {
					type: "string",
					description: "Summary of the issue",
				},
				description: {
					type: "string",
					description: "Description of the issue",
				},
				issueTypeId: {
					type: "number",
					description: "Issue type id",
				},
				priorityId: {
					type: "number",
					description: "Priority id",
				},
				categoryId: {
					type: "number",
					description: "Category id",
				},
				versionId: {
					type: "number",
					description: "Version id",
				},
				milestoneId: {
					type: "number",
					description: "Milestone id",
				},
				assigneeId: {
					type: "number",
					description: "Assignee id",
				},
				startDate: {
					type: "string",
					description: "Start date of the issue (YYYY-MM-DD format)",
				},
				dueDate: {
					type: "string",
					description: "Due date of the issue (YYYY-MM-DD format)",
				},
				estimatedHours: {
					type: "number",
					description: "Estimated hours for the issue",
				},
				actualHours: {
					type: "number",
					description: "Actual hours for the issue",
				},
			},
			required: ["issueIdOrKey"],
		};
	}

	if (isDeleteIssueParamsSchema) {
		return {
			type: "object" as const,
			properties: {
				issueIdOrKey: {
					type: "string",
					description: "Issue ID or Issue Key",
				},
			},
			required: ["issueIdOrKey", "content"],
		};
	}

	if (isWikisParamsSchema) {
		return {
			type: "object" as const,
			properties: {
				projectIdOrKey: {
					type: "string",
					description: "Project ID or Project Key",
				},
				keywords: {
					type: "string",
					description: "Keyword for searching",
				},
			},
			required: ["projectIdOrKey"],
		};
	}

	if (isWikiParamsSchema) {
		return {
			type: "object" as const,
			properties: {
				wikiId: {
					type: "number",
					description: "Wiki page ID",
				},
			},
			required: ["wikiId"],
		};
	}

	if (isAddWikiParamsSchema) {
		return {
			type: "object" as const,
			properties: {
				projectId: {
					type: "number",
					description: "Project ID",
				},
				name: {
					type: "string",
					description: "Page Name",
				},
				content: {
					type: "string",
					description: "Content",
				},
				mailNotify: {
					type: "boolean",
					description: "True make to notify by Email",
				},
			},
			required: ["projectId", "name", "content"],
		};
	}

	if (isUpdateWikiParamsSchema) {
		return {
			type: "object" as const,
			properties: {
				wikiId: {
					type: "number",
					description: "Wiki page ID",
				},
				name: {
					type: "string",
					description: "Page Name",
				},
				content: {
					type: "string",
					description: "Content",
				},
				mailNotify: {
					type: "boolean",
					description: "True make to notify by Email",
				},
			},
			required: ["wikiId"],
		};
	}

	if (isDeleteWikiParamsSchema) {
		return {
			type: "object" as const,
			properties: {
				wikiId: {
					type: "number",
					description: "Wiki page ID",
				},
				mailNotify: {
					type: "boolean",
					description: "True make to notify by Email",
				},
			},
			required: ["wikiId"],
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
	// biome-ignore lint/suspicious/noExplicitAny: Because the interface changes according to the purpose
	schema: z.ZodType<any>,
): Tool => {
	const inputSchema = convertZodToJsonSchema(schema);

	return {
		name,
		description,
		inputSchema,
	};
};

export const PROJECTS_TOOL: Tool = createTool(
	"backlog_get_projects",
	"Performs list project get using the Backlog Projects get API. " +
		"Supports pagination, content filtering. " +
		"Maximum 20 results per request, with offset for pagination.",
	ProjectsParamsSchema,
);

export const PROJECT_TOOL: Tool = createTool(
	"backlog_get_project",
	"Performs an project get using the Backlog Project get API.",
	ProjectParamsSchema,
);

export const ISSUES_TOOL: Tool = createTool(
	"backlog_get_issues",
	"Performs list issue get using the Backlog Issues API. " +
		"Supports pagination, content filtering. " +
		"Maximum 20 results per request, with offset for pagination.",
	IssuesParamsSchema,
);

export const ISSUE_TOOL: Tool = createTool(
	"backlog_get_issue",
	"Performs an issue get using the Backlog Issue API.",
	IssueParamsSchema,
);

export const ADD_ISSUE_TOOL: Tool = createTool(
	"backlog_add_issue",
	"Add an issue using the Backlog Issue API.",
	AddIssueParamsSchema,
);

export const UPDATE_ISSUE_TOOL: Tool = createTool(
	"backlog_update_issue",
	"Update an issue using the Backlog Issue API.",
	UpdateIssueParamsSchema,
);

export const DELETE_ISSUE_TOOL: Tool = createTool(
	"backlog_delete_issue",
	"Delete an issue using the Backlog Issue API.",
	DeleteIssueParamsSchema,
);

export const WIKIS_TOOL: Tool = createTool(
	"backlog_get_wikis",
	"Performs list wikis get using the Backlog Wiki API",
	WikisParamsSchema,
);

export const WIKI_TOOL: Tool = createTool(
	"backlog_get_wiki",
	"Performs an wiki get using the Backlog Wiki API.",
	WikiParamsSchema,
);

export const ADD_WIKI_TOOL: Tool = createTool(
	"backlog_add_wiki",
	"Add an wiki using the Backlog Wiki API.",
	AddWikiParamsSchema,
);

export const UPDATE_WIKI_TOOL: Tool = createTool(
	"backlog_update_wiki",
	"Update an wiki using the Backlog Wiki API.",
	UpdateWikiParamsSchema,
);

export const DELETE_WIKI_TOOL: Tool = createTool(
	"backlog_delete_wiki",
	"Delete an wiki using the Backlog Wiki API.",
	DeleteWikiParamsSchema,
);

export const ALL_TOOLS: Tool[] = [
	PROJECTS_TOOL,
	PROJECT_TOOL,
	ISSUES_TOOL,
	ISSUE_TOOL,
	ADD_ISSUE_TOOL,
	UPDATE_ISSUE_TOOL,
	DELETE_ISSUE_TOOL,
	WIKIS_TOOL,
	WIKI_TOOL,
	ADD_WIKI_TOOL,
	UPDATE_WIKI_TOOL,
	DELETE_WIKI_TOOL,
];
