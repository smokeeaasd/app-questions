import { QuestionService } from "../services/questionService";
import { UserService } from "../services/userService";
import { AnswerCompleteData } from "../types/Answer";
import { QuestionCompleteData } from "../types/Question";
import { UserData, UserLookupData } from "../types/User";
import { CategoryData } from "./Category";

export default class Question {
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

	async get(): Promise<QuestionCompleteData | null> {
		const resQuestion = await QuestionService.get(this.token, this.id);

		if (resQuestion.success) {
			return resQuestion.data as QuestionCompleteData
		}

		return null;
	}

	static async all(token: string): Promise<QuestionCompleteData[] | null> {
		const resUser = await UserService.user(token);

		if (resUser.success) {
			const resQuestions = await QuestionService.questions(token);

			if (resQuestions.success) {
				return resQuestions.data as QuestionCompleteData[]
			}
		}

		return null;
	}

	async answers(): Promise<AnswerCompleteData[] | null> {
		if (await this.user() != null) {
			const resAnswers = await QuestionService.answers(this.token, this.id);

			if (resAnswers.success) {
				return resAnswers.data as AnswerCompleteData[];
			}
		}

		return null;
	}

	async author(): Promise<UserLookupData | null> {
		const user = await this.user();

		if (user != null) {
			const resQuestion = await UserService.lookup(this.token, user.id);

			if (resQuestion.success) {
				return resQuestion.data as UserLookupData;
			}
		}

		return null;
	}

	async categories(): Promise<CategoryData[] | null> {
		if (await this.user() != null) {
			const resCategories = await QuestionService.categories(this.token, this.id);

			if (resCategories.success) {
				return resCategories.data as CategoryData[]
			}
		}

		return null;
	}
}