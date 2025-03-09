import { z } from "zod";

const BaseParamsSchema = z.object({
	offset: z
		.number()
		.int()
		.min(0)
		.optional()
		.default(0)
		.describe("Offset for pagination"),
	count: z
		.number()
		.int()
		.min(1)
		.max(100)
		.optional()
		.default(10)
		.describe("Number of results (1-100, default 10)"),
});

const DateRangeSchema = z.object({
	createdSince: z.string().optional().describe("Start date of created date"),
	createdUntil: z.string().optional().describe("End date of created date"),
	updatedSince: z.string().optional().describe("Start date of updated date"),
	updatedUntil: z.string().optional().describe("End date of updated date"),
	startDateSince: z.string().optional().describe("Start date of start date"),
	startDateUntil: z.string().optional().describe("End date of start date"),
	dueDateSince: z.string().optional().describe("Start date of due date"),
	dueDateUntil: z.string().optional().describe("End date of due date"),
});

const EntityIdsSchema = z.object({
	projectId: z.array(z.number()).optional().describe("Project ids"),
	issueTypeId: z.array(z.number()).optional().describe("Issue type ids"),
	categoryId: z.array(z.number()).optional().describe("Category ids"),
	versionId: z.array(z.number()).optional().describe("Version ids"),
	milestoneId: z.array(z.number()).optional().describe("Milestone ids"),
	statusId: z.array(z.number()).optional().describe("Status ids"),
	priorityId: z.array(z.number()).optional().describe("Priority ids"),
	assigneeId: z.array(z.number()).optional().describe("Assignee ids"),
	createdUserId: z.array(z.number()).optional().describe("Created user ids"),
	resolutionId: z.array(z.number()).optional().describe("Reason of done ids"),
	id: z.array(z.number()).optional().describe("Issue ids"),
	parentIssueId: z.array(z.number()).optional().describe("Parent issue ids"),
});

const ConditionSchema = z.object({
	parentChild: z
		.number()
		.int()
		.min(0)
		.max(4)
		.optional()
		.describe(
			"Condition of parent child issue. 0: All, 1: Exclude child issue, 2: Only child issue, 3: Neither parent nor child issue, 4: Only parent issue",
		),
	attachment: z
		.boolean()
		.optional()
		.describe(
			"Condition of attachment. true: With attachment, false: Without attachment",
		),
	sharedFile: z
		.boolean()
		.optional()
		.describe(
			"Condition of shared file. true: With shared file, false: Without shared file",
		),
});

const SortingSchema = z.object({
	sort: z
		.enum([
			"issueType",
			"category",
			"version",
			"milestone",
			"summary",
			"status",
			"priority",
			"attachment",
			"sharedFile",
			"created",
			"createdUser",
			"updated",
			"updatedUser",
			"assignee",
			"startDate",
			"dueDate",
			"estimatedHours",
			"actualHours",
			"childIssue",
		])
		.optional()
		.describe("Attribute name for sorting"),
	order: z
		.enum(["asc", "desc"])
		.optional()
		.default("desc")
		.describe("Sort order"),
});

const KeywordSchema = z.object({
	keyword: z.string().optional().describe("Keyword for searching"),
});

export const ProjectsParamsSchema = z.object({
	archived: z
		.boolean()
		.optional()
		.describe(
			"For unspecified parameters, this form returns all projects. For false parameters, it returns unarchived projects. For true parameters, it returns archived projects.",
		),
	all: z
		.boolean()
		.optional()
		.default(false)
		.describe(
			"Only applies to administrators. If true, it returns all projects. If false, it returns only projects they have joined (set to false by default).",
		),
});

export const ProjectParamsSchema = z.object({
	projectIdOrKey: z.string().describe("Project ID or Project Key"),
});

export const IssuesParamsSchema = BaseParamsSchema.merge(DateRangeSchema)
	.merge(EntityIdsSchema)
	.merge(ConditionSchema)
	.merge(SortingSchema)
	.merge(KeywordSchema);

export const IssueParamsSchema = z.object({
	issueIdOrKey: z.string().describe("Issue ID or Issue Key"),
});

export const AddIssueParamsSchema = z.object({
	projectId: z.number().int().describe("Project id"),
	summary: z.string().describe("Summary"),
	parentIssueId: z.number().int().optional().describe("Parent issue id"),
	description: z.string().optional().describe("Description"),
	startDate: z.string().optional().describe("Start date"),
	dueDate: z.string().optional().describe("Due date"),
	estimatedHours: z.number().optional().describe("Estimated hours"),
	actualHours: z.number().optional().describe("Actual hours"),
	issueTypeId: z.number().int().describe("Issue type id"),
	categoryId: z.array(z.number()).optional().describe("Category ids"),
	versionId: z.array(z.number()).optional().describe("Version ids"),
	milestoneId: z.array(z.number()).optional().describe("Milestone ids"),
	priorityId: z.number().int().describe("Priority id"),
	assigneeId: z.number().int().optional().describe("Assignee id"),
	notifiedUserId: z.array(z.number()).optional().describe("Notified user ids"),
	attachmentId: z.array(z.number()).optional().describe("Attachment ids"),
});

export const UpdateIssueParamsSchema = z.object({
	issueIdOrKey: z.string().describe("Issue ID or Issue Key"),
	summary: z.string().optional().describe("Summary"),
	parentIssueId: z.number().int().optional().describe("Parent issue id"),
	description: z.string().optional().describe("Description"),
	statusId: z.number().int().optional().describe("Status id"),
	startDate: z.string().optional().describe("Start date"),
	dueDate: z.string().optional().describe("Due date"),
	estimatedHours: z.number().optional().describe("Estimated hours"),
	actualHours: z.number().optional().describe("Actual hours"),
	issueTypeId: z.number().int().optional().describe("Issue type id"),
	categoryId: z.array(z.number()).optional().describe("Category ids"),
	versionId: z.array(z.number()).optional().describe("Version ids"),
	milestoneId: z.array(z.number()).optional().describe("Milestone ids"),
	priorityId: z.number().int().optional().describe("Priority id"),
	assigneeId: z.number().int().optional().describe("Assignee id"),
	notifiedUserId: z.array(z.number()).optional().describe("Notified user ids"),
	attachmentId: z.array(z.number()).optional().describe("Attachment ids"),
	comment: z.string().optional().describe("Comment"),
});

export const DeleteIssueParamsSchema = z.object({
	issueIdOrKey: z.string().describe("Issue ID or Issue Key"),
});

export const WikisParamsSchema = z.object({
	projectIdOrKey: z.string().describe("Project ID or Project Key"),
	keyword: z.string().optional().describe("Keyword for searching"),
});

export const WikiParamsSchema = z.object({
	wikiId: z.number().int().describe("Wiki page ID"),
});

export const AddWikiParamsSchema = z.object({
	projectId: z.number().int().describe("Project ID"),
	name: z.string().describe("Page Name"),
	content: z.string().describe("Content"),
	mailNotify: z.boolean().optional().describe("True make to notify by Email"),
});

export const UpdateWikiParamsSchema = z.object({
	wikiId: z.number().int().describe("Wiki page ID"),
	name: z.string().optional().describe("Page Name"),
	content: z.string().optional().describe("Content"),
	mailNotify: z.boolean().optional().describe("True make to notify by Email"),
});

export const DeleteWikiParamsSchema = z.object({
	wikiId: z.number().int().describe("Wiki page ID"),
	mailNotify: z.boolean().optional().describe("True make to notify by Email"),
});

export type ProjectsParams = z.infer<typeof ProjectsParamsSchema>;
export type ProjectParams = z.infer<typeof ProjectParamsSchema>;
export type IssuesParams = z.infer<typeof IssuesParamsSchema>;
export type IssueParams = z.infer<typeof IssueParamsSchema>;
export type AddIssueParams = z.infer<typeof AddIssueParamsSchema>;
export type UpdateIssueParams = z.infer<typeof UpdateIssueParamsSchema>;
export type DeleteIssueParams = z.infer<typeof DeleteIssueParamsSchema>;
export type WikisParams = z.infer<typeof WikisParamsSchema>;
export type WikiParams = z.infer<typeof WikiParamsSchema>;
export type AddWikiParams = z.infer<typeof AddWikiParamsSchema>;
export type UpdateWikiParams = z.infer<typeof UpdateWikiParamsSchema>;
export type DeleteWikiParams = z.infer<typeof DeleteWikiParamsSchema>;
