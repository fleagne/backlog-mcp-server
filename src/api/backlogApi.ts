import { BACKLOG_API_KEY, BACKLOG_BASE_URL } from "../config/config.js";
import type { IssueParams, IssuesParams } from "../core/schema.js";
import type { BacklogIssue } from "../core/types.js";
import { APIError } from "../error/errors.js";

class BacklogAPI {
	private baseUrl: string;
	private apiKey: string;

	constructor(baseUrl: string, apiKey: string) {
		this.baseUrl = baseUrl;
		this.apiKey = apiKey;
	}

	private async request<T>(
		path: string,
		params: Record<string, any> = {},
	): Promise<T> {
		const url = new URL(`${this.baseUrl}${path}`);
		url.searchParams.set("apiKey", this.apiKey);

		for (const [key, value] of Object.entries(params)) {
			if (value === undefined || value === null) continue;

			if (Array.isArray(value)) {
				for (const item of value) {
					url.searchParams.append(`${key}[]`, String(item));
				}
			} else {
				url.searchParams.set(key, String(value));
			}
		}

		try {
			const response = await fetch(url, {
				headers: {
					Accept: "application/json",
				},
			});

			if (!response.ok) {
				const errorText = await response.text();
				throw new APIError(
					`Backlog API responded with status: ${response.status} ${response.statusText}\n${errorText}`,
					response.status,
				);
			}

			return response.json() as Promise<T>;
		} catch (error) {
			if (error instanceof APIError) {
				throw error;
			}

			throw new APIError(
				`Failed to communicate with Backlog API: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	}
	async searchIssues(params: IssuesParams): Promise<string> {
		const data = await this.request<BacklogIssue[]>("/issues", params);

		return JSON.stringify(data, null, 2);
	}

	async getIssue(params: IssueParams): Promise<string> {
		const data = await this.request<BacklogIssue>(
			`/issues/${params.issueIdOrKey}`,
		);
		return JSON.stringify(data, null, 2);
	}
}

// APIインスタンスをエクスポート
export const backlogAPI = new BacklogAPI(BACKLOG_BASE_URL, BACKLOG_API_KEY);
