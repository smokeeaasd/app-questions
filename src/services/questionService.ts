import service from "./service";

export class QuestionService {
	static async get(token: string, id: string) {
		try {
			const res = await service.get(`/api/questions/${id}`, {
				headers: {
					'Authorization': `Bearer ${token}`,
				}
			});

			return {
				success: true,
				status: res.status,
				data: res.data
			}
		} catch (error: any) {
			return {
				success: false,
				data: error.response ? error.response.data : null,
				status: error.response ? error.response.status : null
			}
		}
	}

	static async questions(token: string) {
		try {
			const res = await service.get("/api/questions", {
				headers: {
					'Authorization': `Bearer ${token}`,
				}
			});

			return {
				success: true,
				status: res.status,
				data: res.data
			}
		} catch (error: any) {
			return {
				success: false,
				data: error.response ? error.response.data : null,
				status: error.response ? error.response.status : null
			}
		}
	}
	static async answers(token: string, questionId: string) {
		try {
			const res = await service.get(`/api/questions/${questionId}/answers`, {
				headers: {
					'Authorization': `Bearer ${token}`,
				}
			});

			return {
				success: true,
				status: res.status,
				data: res.data
			}
		} catch (error: any) {
			return {
				success: false,
				data: error.response ? error.response.data : null,
				status: error.response ? error.response.status : null
			}
		}
	}

	static async categories(token: string, questionId: string) {
		try {
			const res = await service.get(`/api/questions/${questionId}/categories`, {
				headers: {
					'Authorization': `Bearer ${token}`,
				}
			});

			return {
				success: true,
				status: res.status,
				data: res.data
			}
		} catch (error: any) {
			return {
				success: false,
				data: error.response ? error.response.data : null,
				status: error.response ? error.response.status : null
			}
		}
	}
}