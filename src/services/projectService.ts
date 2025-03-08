import { backlogAPI } from "../api/backlogApi.js";
import type { ProjectParams, ProjectsParams } from "../core/schema.js";

class ProjectService {
	async getProjects(params: ProjectsParams): Promise<string> {
		try {
			return await backlogAPI.getProjects(params);
		} catch (error) {
			throw new Error(
				`Failed to get projects: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	}

	async getProject(params: ProjectParams): Promise<string> {
		try {
			return await backlogAPI.getProject(params);
		} catch (error) {
			throw new Error(
				`Failed to get project: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	}
}

export const projectService = new ProjectService();
