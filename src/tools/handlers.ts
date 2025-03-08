import {
	AddIssueParamsSchema,
	IssueParamsSchema,
	IssuesParamsSchema,
	ProjectParamsSchema,
	ProjectsParamsSchema,
} from "../core/schema.js";
import type { ToolName } from "../core/types.js";
import { ValidationError, formatError } from "../error/errors.js";
import { backlogService } from "../services/index.js";

interface ToolResponse {
	content: {
		type: string;
		text: string;
	}[];
	isError: boolean;
}

// biome-ignore lint/suspicious/noExplicitAny: Because the interface changes according to the purpose
type ToolHandler = (args: any) => Promise<ToolResponse>;

const handleGetProjects: ToolHandler = async (args) => {
	try {
		try {
			const validatedParams = ProjectsParamsSchema.parse(args);

			const text = await backlogService.getProjects(validatedParams);

			return {
				content: [
					{
						type: "text",
						text: `Results for your query:\n${text}`,
					},
				],
				isError: false,
			};
		} catch (validationError) {
			throw new ValidationError(
				`Invalid parameters: ${validationError instanceof Error ? validationError.message : String(validationError)}`,
			);
		}
	} catch (error) {
		return {
			content: [
				{
					type: "text",
					text: `Error: ${formatError(error)}`,
				},
			],
			isError: true,
		};
	}
};

const handleGetProject: ToolHandler = async (args) => {
	try {
		try {
			const validatedParams = ProjectParamsSchema.parse(args);

			const text = await backlogService.getProject(validatedParams);

			return {
				content: [
					{
						type: "text",
						text: `Project details for ${validatedParams.projectIdOrKey}:\n${text}`,
					},
				],
				isError: false,
			};
		} catch (validationError) {
			throw new ValidationError(
				`Invalid parameters: ${validationError instanceof Error ? validationError.message : String(validationError)}`,
			);
		}
	} catch (error) {
		return {
			content: [
				{
					type: "text",
					text: `Error: ${formatError(error)}`,
				},
			],
			isError: true,
		};
	}
};

const handleGetIssues: ToolHandler = async (args) => {
	try {
		try {
			const validatedParams = IssuesParamsSchema.parse(args);

			const text = await backlogService.getIssues(validatedParams);

			return {
				content: [
					{
						type: "text",
						text: `Results for your query:\n${text}`,
					},
				],
				isError: false,
			};
		} catch (validationError) {
			throw new ValidationError(
				`Invalid parameters: ${validationError instanceof Error ? validationError.message : String(validationError)}`,
			);
		}
	} catch (error) {
		return {
			content: [
				{
					type: "text",
					text: `Error: ${formatError(error)}`,
				},
			],
			isError: true,
		};
	}
};

const handleGetIssue: ToolHandler = async (args) => {
	try {
		try {
			const validatedParams = IssueParamsSchema.parse(args);

			const text = await backlogService.getIssue(validatedParams);

			return {
				content: [
					{
						type: "text",
						text: `Issue details for ${validatedParams.issueIdOrKey}:\n${text}`,
					},
				],
				isError: false,
			};
		} catch (validationError) {
			throw new ValidationError(
				`Invalid parameters: ${validationError instanceof Error ? validationError.message : String(validationError)}`,
			);
		}
	} catch (error) {
		return {
			content: [
				{
					type: "text",
					text: `Error: ${formatError(error)}`,
				},
			],
			isError: true,
		};
	}
};

const handleAddIssue: ToolHandler = async (args) => {
	try {
		try {
			const validatedParams = AddIssueParamsSchema.parse(args);

			const text = await backlogService.addIssue(validatedParams);

			return {
				content: [
					{
						type: "text",
						text: `Results for your query:\n${text}`,
					},
				],
				isError: false,
			};
		} catch (validationError) {
			throw new ValidationError(
				`Invalid parameters: ${validationError instanceof Error ? validationError.message : String(validationError)}`,
			);
		}
	} catch (error) {
		return {
			content: [
				{
					type: "text",
					text: `Error: ${formatError(error)}`,
				},
			],
			isError: true,
		};
	}
};

export const toolHandlers: Record<ToolName, ToolHandler> = {
	backlog_get_projects: handleGetProjects,
	backlog_get_project: handleGetProject,
	backlog_get_issues: handleGetIssues,
	backlog_get_issue: handleGetIssue,
	backlog_add_issue: handleAddIssue,
};
