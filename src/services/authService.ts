import { UserLoginData, UserRegisterData } from "../types/User";
import { BaseService, RequestResponse } from "./baseService";

export class AuthService extends BaseService {
	// Registra um usuário
	async register(data: UserRegisterData): Promise<RequestResponse<any>> {
		try {
			const response = await this.service.post("/api/register", data);

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

	// Autentica um usuário e retorna o token
	async login(data: UserLoginData): Promise<RequestResponse<{ token: string }>> {
		try {
			const response = await this.service.post("/api/login", data);

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