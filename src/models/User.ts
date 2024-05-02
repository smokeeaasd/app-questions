import { AuthService } from "../services/authService";
import { UserService } from "../services/userService";
import { AnswerData } from "../types/Answer";
import { QuestionData } from "../types/Question";
import { UserData, UserLoginData, UserLookupData, UserRegisterData } from "../types/User";

export default class User {
	private token: string;
	constructor(token: string) {
		this.token = token;
	}

	static async register(data: UserRegisterData) {
		const resUser = await AuthService.register(data);

		if (resUser.success) {
			return resUser.data as UserData
		}

		return null;
	}

	static async login(data: UserLoginData) {
		const resUser = await AuthService.login(data);

		if (resUser.success) {
			return resUser.data as { token: string }
		}

		return null;
	}

	async me(): Promise<UserData | null> {
		const resUser = await UserService.user(this.token);

		if (resUser.success) {
			return resUser.data as UserData
		}

		return null;
	}

	async questions(max: number): Promise<QuestionData[] | null> {
		if (await this.me() != null) {
			const resQuestions = await UserService.questions(this.token, max);

			if (resQuestions.success) {
				return resQuestions.data as QuestionData[];
			}
		}

		return null;
	}

	async answers(): Promise<AnswerData[] | null> {
		if (await this.me() != null) {
			const resAnswers = await UserService.answers(this.token);

			if (resAnswers.success) {
				return resAnswers.data as AnswerData[];
			}
		}

		return null;
	}

	async lookup(id: string): Promise<UserLookupData | null> {
		if (await this.me() != null) {
			const resUser = await UserService.lookup(this.token, id);

			if (resUser.success) {
				return resUser.data as UserLookupData;
			}
		}

		return null;
	}
}