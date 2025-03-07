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

export interface BacklogIssue {
	id: number;
	projectId: number;
	issueKey: string;
	keyId: number;
	issueType: {
		id: number;
		projectId: number;
		name: string;
		color: string;
		displayOrder: number;
	};
	summary: string;
	description: string;
	resolution: string;
	priority: {
		id: number;
		name: string;
	};
	assignee: BacklogUser;
	category: string[];
	versions: string[];
	milestone: {
		id: number;
		projectId: number;
		name: string;
		description: string;
		startDate: string;
		releaseDueDate: string;
		archived: boolean;
		displayOrder: number;
	}[];
	startDate: string;
	dueDate: string;
	estimatedHours: number;
	actualHours: number;
	parentIssueId: number;
	createdUser: BacklogUser;
	created: string;
	updatedUser: BacklogUser;
	updated: string;
	customFields: string[];
	attachments: {
		id: number;
		name: string;
		size: number;
	}[];
	sharedFiles: {
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
	}[];
	stars: {
		id: number;
		comment: string;
		url: string;
		title: string;
		presenter: BacklogUser;
		created: string;
	}[];
}
