import { backlogAPI } from "../api/backlogApi.js";
import type { IssueParams, IssuesParams } from "../core/schema.js";

class BacklogService {
	async searchIssues(params: IssuesParams): Promise<string> {
		try {
			return await backlogAPI.searchIssues(params);
		} catch (error) {
			throw new Error(
				`Failed to search issues: ${error instanceof Error ? error.message : String(error)}`,
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
}

export const backlogService = new BacklogService();
