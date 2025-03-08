import { IssueParamsSchema, IssuesParamsSchema } from "../core/schema.js";
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

type ToolHandler = (args: any) => Promise<ToolResponse>;

const handleSearchIssues: ToolHandler = async (args) => {
	try {
		try {
			const validatedParams = IssuesParamsSchema.parse(args);

			const text = await backlogService.searchIssues(validatedParams);

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

const handleSearchIssue: ToolHandler = async (args) => {
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

export const toolHandlers: Record<ToolName, ToolHandler> = {
	backlog_search_issues: handleSearchIssues,
	backlog_search_issue: handleSearchIssue,
};
