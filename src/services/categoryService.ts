import service from "./service";

export class CategoryService {
	static async all(token: string) {
		try {
			const res = await service.get("/api/categories", {
				headers: {
					'Authorization': `Bearer ${token}`
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

	static async get(token: string, id: string) {
		try {
			const res = await service.get(`/api/categories/${id}`, {
				headers: {
					'Authorization': `Bearer ${token}`
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