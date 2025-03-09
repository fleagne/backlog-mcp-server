import { backlogAPI } from "../api/backlogApi.js";
import type {
	AddWikiParams,
	DeleteWikiParams,
	UpdateWikiParams,
	WikiParams,
	WikisParams,
} from "../core/schema.js";

class WikiService {
	async getWikis(params: WikisParams): Promise<string> {
		try {
			return await backlogAPI.getWikis(params);
		} catch (error) {
			throw new Error(
				`Failed to get wikis: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	}

	async getWiki(params: WikiParams): Promise<string> {
		try {
			return await backlogAPI.getWiki(params);
		} catch (error) {
			throw new Error(
				`Failed to get wiki: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	}

	async addWiki(params: AddWikiParams): Promise<string> {
		try {
			return await backlogAPI.addWiki(params);
		} catch (error) {
			throw new Error(
				`Failed to add wiki: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	}

	async updateWiki(params: UpdateWikiParams): Promise<string> {
		try {
			return await backlogAPI.updateWiki(params);
		} catch (error) {
			throw new Error(
				`Failed to update wiki: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	}

	async deleteWiki(params: DeleteWikiParams): Promise<string> {
		try {
			return await backlogAPI.deleteWiki(params);
		} catch (error) {
			throw new Error(
				`Failed to delete wiki: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	}
}

export const wikiService = new WikiService();
