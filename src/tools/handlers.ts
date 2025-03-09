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
import type { ToolName } from "../core/types.js";
import { ValidationError, formatError } from "../error/errors.js";
import {
	issueService,
	projectService,
	wikiService,
} from "../services/index.js";

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

			const text = await projectService.getProjects(validatedParams);

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

			const text = await projectService.getProject(validatedParams);

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

			const text = await issueService.getIssues(validatedParams);

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

			const text = await issueService.getIssue(validatedParams);

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

			const text = await issueService.addIssue(validatedParams);

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

const handleUpdateIssue: ToolHandler = async (args) => {
	try {
		try {
			const validatedParams = UpdateIssueParamsSchema.parse(args);

			const text = await issueService.updateIssue(validatedParams);

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

const handleDeleteIssue: ToolHandler = async (args) => {
	try {
		try {
			const validatedParams = DeleteIssueParamsSchema.parse(args);

			const text = await issueService.deleteIssue(validatedParams);

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

const handleGetWikis: ToolHandler = async (args) => {
	try {
		try {
			const validatedParams = WikisParamsSchema.parse(args);

			const text = await wikiService.getWikis(validatedParams);

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

const handleGetWiki: ToolHandler = async (args) => {
	try {
		try {
			const validatedParams = WikiParamsSchema.parse(args);

			const text = await wikiService.getWiki(validatedParams);

			return {
				content: [
					{
						type: "text",
						text: `Wiki details for ${validatedParams.wikiId}:\n${text}`,
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

const handleAddWiki: ToolHandler = async (args) => {
	try {
		try {
			const validatedParams = AddWikiParamsSchema.parse(args);

			const text = await wikiService.addWiki(validatedParams);

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

const handleUpdateWiki: ToolHandler = async (args) => {
	try {
		try {
			const validatedParams = UpdateWikiParamsSchema.parse(args);

			const text = await wikiService.updateWiki(validatedParams);

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

const handleDeleteWiki: ToolHandler = async (args) => {
	try {
		try {
			const validatedParams = DeleteWikiParamsSchema.parse(args);

			const text = await wikiService.deleteWiki(validatedParams);

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
	backlog_update_issue: handleUpdateIssue,
	backlog_delete_issue: handleDeleteIssue,
	backlog_get_wikis: handleGetWikis,
	backlog_get_wiki: handleGetWiki,
	backlog_add_wiki: handleAddWiki,
	backlog_update_wiki: handleUpdateWiki,
	backlog_delete_wiki: handleDeleteWiki,
};
