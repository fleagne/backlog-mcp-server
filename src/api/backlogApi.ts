import { BACKLOG_API_KEY, BACKLOG_BASE_URL } from "../config/config.js";
import type {
	AddIssueParams,
	DeleteIssueParams,
	IssueParams,
	IssuesParams,
	ProjectParams,
	ProjectsParams,
	UpdateIssueParams,
} from "../core/schema.js";
import type { BacklogIssue, BacklogProject } from "../core/types.js";
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
		// biome-ignore lint/suspicious/noExplicitAny: Because the interface changes according to the purpose
		params: Record<string, any> = {},
		method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
		headers: Record<string, string> = {},
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

		let bodyData: URLSearchParams | string | undefined;
		if (method === "POST" || method === "PATCH") {
			if (headers["Content-Type"] === "application/x-www-form-urlencoded") {
				const formData = new URLSearchParams();
				for (const [key, value] of Object.entries(params)) {
					if (value === undefined || value === null) continue;

					if (Array.isArray(value)) {
						for (const item of value) {
							formData.append(`${key}[]`, String(item));
						}
					} else {
						formData.append(key, String(value));
					}
				}
				bodyData = formData;
			} else {
				bodyData = JSON.stringify(params);
			}
		}

		try {
			const response = await fetch(url, {
				method: method,
				headers: headers,
				body: bodyData,
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

	async getProjects(params: ProjectsParams): Promise<string> {
		const data = await this.request<BacklogProject[]>(
			"/projects",
			params,
			"GET",
			{
				Accept: "application/json",
			},
		);

		return JSON.stringify(data, null, 2);
	}

	async getProject(params: ProjectParams): Promise<string> {
		const data = await this.request<BacklogProject>(
			`/projects/${params.projectIdOrKey}`,
			{},
			"GET",
			{
				Accept: "application/json",
			},
		);
		return JSON.stringify(data, null, 2);
	}

	async getIssues(params: IssuesParams): Promise<string> {
		const data = await this.request<BacklogIssue[]>("/issues", params, "GET", {
			Accept: "application/json",
		});

		return JSON.stringify(data, null, 2);
	}

	async getIssue(params: IssueParams): Promise<string> {
		const data = await this.request<BacklogIssue>(
			`/issues/${params.issueIdOrKey}`,
			{},
			"GET",
			{
				Accept: "application/json",
			},
		);
		return JSON.stringify(data, null, 2);
	}

	async addIssue(params: AddIssueParams): Promise<string> {
		const data = await this.request<BacklogIssue>("/issues", params, "POST", {
			"Content-Type": "application/x-www-form-urlencoded",
		});
		return JSON.stringify(data, null, 2);
	}

	async updateIssue(params: UpdateIssueParams): Promise<string> {
		const data = await this.request<BacklogIssue>(
			`/issues/${params.issueIdOrKey}`,
			{ ...params, issueIdOrKey: undefined },
			"PATCH",
			{
				"Content-Type": "application/x-www-form-urlencoded",
			},
		);
		return JSON.stringify(data, null, 2);
	}

	async deleteIssue(params: DeleteIssueParams): Promise<string> {
		const data = await this.request<BacklogIssue>(
			`/issues/${params.issueIdOrKey}`,
			{},
			"DELETE",
			{
				"Content-Type": "application/x-www-form-urlencoded",
			},
		);
		return JSON.stringify(data, null, 2);
	}
}

export const backlogAPI = new BacklogAPI(BACKLOG_BASE_URL, BACKLOG_API_KEY);
