import { backlogAPI } from "../api/backlogApi.js";
import type {
	AddIssueParams,
	DeleteIssueParams,
	IssueParams,
	IssuesParams,
	UpdateIssueParams,
} from "../core/schema.js";

class IssueService {
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

	async updateIssue(params: UpdateIssueParams): Promise<string> {
		try {
			return await backlogAPI.updateIssue(params);
		} catch (error) {
			throw new Error(
				`Failed to update issue: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	}

	async deleteIssue(params: DeleteIssueParams): Promise<string> {
		try {
			return await backlogAPI.deleteIssue(params);
		} catch (error) {
			throw new Error(
				`Failed to delete issue: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	}
}

export const issueService = new IssueService();
