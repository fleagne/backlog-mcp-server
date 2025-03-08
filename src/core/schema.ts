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

export const IssuesParamsSchema = BaseParamsSchema.merge(DateRangeSchema)
	.merge(EntityIdsSchema)
	.merge(ConditionSchema)
	.merge(SortingSchema)
	.merge(KeywordSchema);

export const IssueParamsSchema = z.object({
	issueIdOrKey: z.string().describe("Issue id or key"),
});

export type IssuesParams = z.infer<typeof IssuesParamsSchema>;
export type IssueParams = z.infer<typeof IssueParamsSchema>;
