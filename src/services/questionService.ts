import { QuestionData } from "../types/Question";
import { BaseService, RequestResponse } from "./baseService";
import IService from "./crud";

export class QuestionService extends BaseService implements IService<QuestionData> {

	update(token: string, id: string, data: any): Promise<RequestResponse<QuestionData>> {
		throw new Error("Method not implemented.");
	}
	destroy(token: string, data: string, ...args: any[]): Promise<RequestResponse<QuestionData>> {
		throw new Error("Method not implemented.");
	}
	// Retorna uma questão específica por ID
	async show(token: string, id: string): Promise<RequestResponse<QuestionData>> {
		const headers = {
			'Authorization': `Bearer ${token}`,
		};

		try {
			const response = await this.service.get(`/api/questions/${id}`, { headers });

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

	// Retorna todas as questões
	async index(token: string): Promise<RequestResponse<QuestionData[]>> {
		const headers = {
			'Authorization': `Bearer ${token}`,
		};

		try {
			const response = await this.service.get("/api/questions", { headers });

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

	async store(token: string, data: any): Promise<RequestResponse<QuestionData>> {
		const headers = {
			'Authorization': `Bearer ${token}`,
		};

		try {
			const response = await this.service.post(`/api/questions`, data, { headers });

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

	// Retorna todas as respostas para uma questão específica
	async answers(token: string, questionId: string): Promise<RequestResponse<QuestionData>> {
		const headers = {
			'Authorization': `Bearer ${token}`,
		};

		try {
			const response = await this.service.get(`/api/questions/${questionId}/answers`, { headers });

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

	// Retorna todas as categorias para uma questão específica
	async categories(token: string, questionId: string): Promise<RequestResponse<QuestionData>> {
		const headers = {
			'Authorization': `Bearer ${token}`,
		};

		try {
			const response = await this.service.get(`/api/questions/${questionId}/categories`, { headers });

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

	async setCategories(token: string, questionId: string, data: { categories: string[] }) {
		const headers = {
			'Authorization': `Bearer ${token}`,
		};

		try {
			const response = await this.service.post(`/api/questions/${questionId}/categories`, data, { headers });

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