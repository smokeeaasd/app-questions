import { UserLoginData, UserRegisterData } from "../types/User";
import service from "./service";

export class AuthService {
	// Registra o um usuário.
	static async register(data: UserRegisterData) {
		try {
			const res = await service.post("/api/register", data);

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

	// Retorna o token de usuário, se certo.
	static async login(data: UserLoginData) {
		try {
			console.log('loginData', data);
			const res = await service.post("/api/login", data);

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