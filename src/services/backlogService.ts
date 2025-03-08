import { backlogAPI } from "../api/backlogApi.js";
import type {
	AddIssueParams,
	IssueParams,
	IssuesParams,
	ProjectParams,
	ProjectsParams,
} from "../core/schema.js";

class BacklogService {
	async getProjects(params: ProjectsParams): Promise<string> {
		try {
			return await backlogAPI.getProjects(params);
		} catch (error) {
			throw new Error(
				`Failed to get projects: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	}

	async getProject(params: ProjectParams): Promise<string> {
		try {
			return await backlogAPI.getProject(params);
		} catch (error) {
			throw new Error(
				`Failed to get Ppoject: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	}

	async getIssues(params: IssuesParams): Promise<string> {
		try {
			return await backlogAPI.getIssues(params);
		} catch (error) {
			throw new Error(
				`Failed to get issues: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	}

	async getIssue(params: IssueParams): Promise<string> {
		try {
			return await backlogAPI.getIssue(params);
		} catch (error) {
			throw new Error(
				`Failed to get issue: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	}

	async addIssue(params: AddIssueParams): Promise<string> {
		try {
			return await backlogAPI.addIssue(params);
		} catch (error) {
			throw new Error(
				`Failed to add issue: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	}
}

export const backlogService = new BacklogService();
