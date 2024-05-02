import service from "./service";

export class UserService {
	static async user(token: string) {
		try {
			const res = await service.get("/api/user", {
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

	static async lookup(token: string, userId: string) {
		try {
			const res = await service.get(`/api/user/lookup/${userId}`, {
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

	static async questions(token: string, max: number) {
		try {
			const res = await service.get(`/api/user/questions?max=${max}`, {
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

	static async answers(token: string) {
		try {
			const res = await service.get("/api/user/answers", {
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