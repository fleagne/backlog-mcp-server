interface BacklogUser {
	id: number;
	userId: string;
	name: string;
	roleType: number;
	lang: string;
	nulabAccount: {
		nulabId: string;
		name: string;
		uniqueId: string;
	};
	mailAddress: string;
	lastLoginTime: string;
}

interface BacklogIssueType {
	id: number;
	projectId: number;
	name: string;
	color: string;
	displayOrder: number;
}

interface BacklogPriority {
	id: number;
	name: string;
}

interface BacklogMilestone {
	id: number;
	projectId: number;
	name: string;
	description: string;
	startDate: string;
	releaseDueDate: string;
	archived: boolean;
	displayOrder: number;
}

interface BacklogAttachment {
	id: number;
	name: string;
	size: number;
}

interface BacklogSharedFile {
	id: number;
	projectId: number;
	type: string;
	dir: string;
	name: string;
	size: number;
	createdUser: BacklogUser;
	created: string;
	updatedUser: BacklogUser;
	updated: string;
}

interface BacklogStar {
	id: number;
	comment: string;
	url: string;
	title: string;
	presenter: BacklogUser;
	created: string;
}

interface BacklogCustomField {
	id: number;
	name: string;
	value: string | number | null;
	type: string;
}

export interface BacklogIssue {
	id: number;
	projectId: number;
	issueKey: string;
	keyId: number;
	issueType: BacklogIssueType;
	summary: string;
	description: string;
	resolution: string;
	priority: BacklogPriority;
	status: {
		id: number;
		name: string;
	};
	assignee: BacklogUser;
	category: string[];
	versions: string[];
	milestone: BacklogMilestone[];
	startDate: string;
	dueDate: string;
	estimatedHours: number;
	actualHours: number;
	parentIssueId: number;
	createdUser: BacklogUser;
	created: string;
	updatedUser: BacklogUser;
	updated: string;
	customFields: BacklogCustomField[];
	attachments: BacklogAttachment[];
	sharedFiles: BacklogSharedFile[];
	stars: BacklogStar[];
}

export interface BacklogProject {
	id: number;
	projectKey: string;
	name: string;
	chartEnabled: boolean;
	useResolvedForChart: boolean;
	subtaskingEnabled: boolean;
	projectLeaderCanEditProjectLeader: boolean;
	useWiki: boolean;
	useFileSharing: boolean;
	useWikiTreeView: boolean;
	useOriginalImageSizeAtWiki: boolean;
	useSubversion: boolean;
	useGit: boolean;
	textFormattingRule: string;
	archived: boolean;
	displayOrder: number;
	useDevAttributes: boolean;
}

export type ToolName =
	| "backlog_get_projects"
	| "backlog_get_project"
	| "backlog_get_issues"
	| "backlog_get_issue"
	| "backlog_add_issue";
