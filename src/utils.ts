/**
 * Determine if the argument is an object with issueIdOrKey
 */
export function isIssueArgs(args: unknown): args is { issueIdOrKey: string } {
	return (
		typeof args === "object" &&
		args !== null &&
		"issueIdOrKey" in args &&
		typeof (args as { issueIdOrKey: string }).issueIdOrKey === "string"
	);
}
