import { CategoryService } from "../services/categoryService";
import { UserService } from "../services/userService";
import { UserData } from "../types/User";

export type CategoryData = {
	id: string

	title: string,
	description: string,

	created_at: Date,
	updated_at: Date
}

export default class Category {
	private token: string;
	private id: string;
	constructor(userToken: string, id: string) {
		this.token = userToken;
		this.id = id;
	}

	async user(): Promise<UserData | null> {
		const resUser = await UserService.user(this.token);

		if (resUser.success) {
			return resUser.data as UserData
		}

		return null;
	}

	async get(): Promise<CategoryData | null> {
		if (await this.user() != null) {
			const resCategory = await CategoryService.get(this.token, this.id);

			if (resCategory.success) {
				return resCategory.data as CategoryData
			}

		}

		return null;
	}

	async all(): Promise<CategoryData[] | null> {
		if (await this.user() != null) {
			const resCategories = await CategoryService.all(this.token);

			if (resCategories.success) {
				return resCategories.data as CategoryData[];
			}
		}

		return null;
	}
}