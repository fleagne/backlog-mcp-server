import { BACKLOG_API_KEY, BACKLOG_BASE_URL } from "./consts.js";
import type { BacklogIssue } from "./types.js";

/**
 * Search issues
 * @param args ISSUES_TOOL
 * @returns BacklogIssue[]
 */
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function performIssues(args: Record<string, any>) {
	const url = new URL(`${BACKLOG_BASE_URL}/issues`);
	url.searchParams.set("apiKey", BACKLOG_API_KEY);
	args.projectId && url.searchParams.set("projectId[]", args.projectId);
	args.issueTypeId && url.searchParams.set("issueTypeId[]", args.issueTypeId);
	args.categoryId && url.searchParams.set("categoryId[]", args.categoryId);
	args.versionId && url.searchParams.set("versionId[]", args.versionId);
	args.milestoneId && url.searchParams.set("milestoneId[]", args.milestoneId);
	args.statusId && url.searchParams.set("statusId[]", args.statusId);
	args.priorityId && url.searchParams.set("priorityId[]", args.priorityId);
	args.assigneeId && url.searchParams.set("assigneeId[]", args.assigneeId);
	args.createdUserId &&
		url.searchParams.set("createdUserId[]", args.createdUserId);
	args.resolutionId &&
		url.searchParams.set("resolutionId[]", args.resolutionId);
	args.parentChild && url.searchParams.set("parentChild", args.parentChild);
	args.attachment && url.searchParams.set("attachment", args.attachment);
	args.sharedFile && url.searchParams.set("sharedFile", args.sharedFile);
	args.sort && url.searchParams.set("sort", args.sort);
	args.order && url.searchParams.set("order", args.order);
	args.offset && url.searchParams.set("offset", args.offset);
	args.count && url.searchParams.set("count", args.count);
	args.createdSince && url.searchParams.set("createdSince", args.createdSince);
	args.createdUntil && url.searchParams.set("createdUntil", args.createdUntil);
	args.updatedSince && url.searchParams.set("updatedSince", args.updatedSince);
	args.updatedUntil && url.searchParams.set("updatedUntil", args.updatedUntil);
	args.startDateSince &&
		url.searchParams.set("startDateSince", args.startDateSince);
	args.startDateUntil &&
		url.searchParams.set("startDateUntil", args.startDateUntil);
	args.dueDateSince && url.searchParams.set("dueDateSince", args.dueDateSince);
	args.dueDateUntil && url.searchParams.set("dueDateUntil", args.dueDateUntil);
	args.id && url.searchParams.set("id[]", args.id);
	args.parentIssueId &&
		url.searchParams.set("parentIssueId[]", args.parentIssueId);
	args.keyword && url.searchParams.set("keyword", args.keyword);

	const response = await fetch(url, {
		headers: {
			Accept: "application/json",
		},
	});

	if (!response.ok) {
		throw new Error(
			`Backlog API error: ${response.status} ${response.statusText}\n${await response.text()}`,
		);
	}

	const data = (await response.json()) as BacklogIssue[];

	const results = (data || []).map((d) => ({
		issueKey: d.issueKey || "",
		summary: d.summary || "",
	}));

	return results.map((r) => `${r.issueKey}: ${r.summary}`).join("\n");
}

/**
 * Get issue
 * @param issueIdOrKey Backlog issue id or key
 * @returns BacklogIssue
 */
export async function performIssue(issueIdOrKey: string) {
	const url = new URL(`${BACKLOG_BASE_URL}/issues/${issueIdOrKey}`);
	url.searchParams.set("apiKey", BACKLOG_API_KEY);

	const response = await fetch(url, {
		headers: {
			Accept: "application/json",
		},
	});

	if (!response.ok) {
		throw new Error(
			`Backlog API error: ${response.status} ${response.statusText}\n${await response.text()}`,
		);
	}

	const data = (await response.json()) as BacklogIssue;

	return JSON.stringify(data, null, 2);
}
