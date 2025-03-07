import type { Tool } from "@modelcontextprotocol/sdk/types.js";

export const ISSUES_TOOL: Tool = {
	name: "backlog_search_issues",
	description:
		"Performs list issue search using the Backlog Issues Search API. " +
		"Supports pagination, content filtering. " +
		"Maximum 20 results per request, with offset for pagination. ",
	inputSchema: {
		type: "object",
		properties: {
			projectId: {
				type: "array",
				description: "Project ids",
				items: {
					type: "number",
				},
			},
			issueTypeId: {
				type: "array",
				description: "Issue type ids",
				items: {
					type: "number",
				},
			},
			categoryId: {
				type: "array",
				description: "Category ids",
				items: {
					type: "number",
				},
			},
			versionId: {
				type: "array",
				description: "Version ids",
				items: {
					type: "number",
				},
			},
			milestoneId: {
				type: "array",
				description: "Milestone ids",
				items: {
					type: "number",
				},
			},
			statusId: {
				type: "array",
				description: "Status ids",
				items: {
					type: "number",
				},
			},
			priorityId: {
				type: "array",
				description: "Priority ids",
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
			createdUserId: {
				type: "array",
				description: "Created user ids",
				items: {
					type: "number",
				},
			},
			resolutionId: {
				type: "array",
				description: "Reason of done ids",
				items: {
					type: "number",
				},
			},
			parentChild: {
				type: "number",
				description:
					"Condition of parent child issue. 0: All, 1: Exclude child issue, 2: Only child issue, 3: Neither parent nor child issue, 4: Only parent issue",
			},
			attachment: {
				type: "boolean",
				description:
					"Condition of attachment. true: With attachment, false: Without attachment",
			},
			sharedFile: {
				type: "boolean",
				description:
					"Condition of shared file. true: With shared file, false: Without shared file",
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
			offset: {
				type: "number",
				description: "Offset for pagination",
				default: 0,
			},
			count: {
				type: "number",
				description: "Number of results (1-100, default 20)",
				default: 20,
			},
			createdSince: {
				type: "string",
				description: "Start date of created date",
			},
			createdUntil: {
				type: "string",
				description: "End date of created date",
			},
			updatedSince: {
				type: "string",
				description: "Start date of updated date",
			},
			updatedUntil: {
				type: "string",
				description: "End date of updated date",
			},
			startDateSince: {
				type: "string",
				description: "Start date of start date",
			},
			startDateUntil: {
				type: "string",
				description: "End date of start date",
			},
			dueDateSince: {
				type: "string",
				description: "Start date of due date",
			},
			dueDateUntil: {
				type: "string",
				description: "End date of due date",
			},
			id: {
				type: "array",
				description: "Issue ids",
				items: {
					type: "number",
				},
			},
			parentIssueId: {
				type: "array",
				description: "Parent issue ids",
				items: {
					type: "number",
				},
			},
			keyword: {
				type: "string",
				description: "Keyword for searching",
			},
		},
		required: [],
	},
};

export const ISSUE_TOOL: Tool = {
	name: "backlog_search_issue",
	description: "Performs an issue search using the Backlog Issue Search API.",
	inputSchema: {
		type: "object",
		properties: {
			issueIdOrKey: {
				type: "string",
				description: "Issue id or key",
			},
		},
	},
	required: ["issueIdOrKey"],
};
