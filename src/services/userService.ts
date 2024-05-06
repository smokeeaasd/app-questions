import { AnswerData } from "../types/Answer";
import { QuestionData } from "../types/Question";
import { UserData, UserLookupData } from "../types/User";
import { RequestResponse } from "./baseService";
import { BaseService } from "./baseService";

export class UserService extends BaseService {
	// Retorna os detalhes do usuário autenticado
	async user(token: string): Promise<RequestResponse<UserData>> {
		const headers = {
			'Authorization': `Bearer ${token}`,
		};

		try {
			const response = await this.service.get("/api/user", { headers });

			return {
				success: true,
				status: response.status,
				data: response.data,
			};
		} catch (error: any) {
			const errorResponse = error?.response;

			return {
				success: false,
				data: errorResponse ? errorResponse.data : null,
				status: errorResponse ? errorResponse.status : null,
			};
		}
	}

	// Realiza uma busca pelo ID de usuário
	async lookup(token: string, userId: string): Promise<RequestResponse<UserLookupData>> {
		const headers = {
			'Authorization': `Bearer ${token}`,
		};

		try {
			const response = await this.service.get(`/api/user/lookup/${userId}`, { headers });

			return {
				success: true,
				status: response.status,
				data: response.data,
			};
		} catch (error: any) {
			const errorResponse = error?.response;

			return {
				success: false,
				data: errorResponse ? errorResponse.data : null,
				status: errorResponse ? errorResponse.status : null,
			};
		}
	}

	// Retorna todas as perguntas do usuário autenticado com um limite opcional
	async questions(token: string, max?: number): Promise<RequestResponse<QuestionData[]>> {
		const headers = {
			'Authorization': `Bearer ${token}`,
		};

		const url = max !== undefined ? `/api/user/questions?max=${max}` : "/api/user/questions";

		try {
			const response = await this.service.get(url, { headers });

			return {
				success: true,
				status: response.status,
				data: response.data,
			};
		} catch (error: any) {
			const errorResponse = error?.response;

			return {
				success: false,
				data: errorResponse ? errorResponse.data : null,
				status: errorResponse ? errorResponse.status : null,
			};
		}
	}

	// Retorna todas as respostas do usuário autenticado
	async answers(token: string): Promise<RequestResponse<AnswerData[]>> {
		const headers = {
			'Authorization': `Bearer ${token}`,
		};

		try {
			const response = await this.service.get("/api/user/answers", { headers });

			return {
				success: true,
				status: response.status,
				data: response.data,
			};
		} catch (error: any) {
			const errorResponse = error?.response;

			return {
				success: false,
				data: errorResponse ? errorResponse.data : null,
				status: errorResponse ? errorResponse.status : null,
			};
		}
	}
}