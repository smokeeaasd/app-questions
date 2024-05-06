import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

// Defina um tipo para o retorno da função request
export interface RequestResponse<T> {
	success: boolean;
	status?: number;
	data?: T | null;
}

export class BaseService {
	// Instância de Axios
	protected service = axios.create({
		baseURL: 'http://localhost:8000',
		headers: {
			"Content-Type": "application/json",
		},
	});

	// Método para transformar os dados da resposta
	protected transformData<T>(data: T): T {
		// Retorna os dados inalterados por padrão
		return data;
	}

	// Método genérico para realizar requisições HTTP
	protected async request<T>(
		method: string,
		url: string,
		data?: any,
		headers?: AxiosRequestConfig['headers']
	): Promise<RequestResponse<T>> {
		try {
			const response: AxiosResponse<T> = await this.service.request<T>({
				method,
				url,
				data,
				headers,
			});

			// Modifique `data` usando `transformData`
			const transformedData = this.transformData(response.data);

			return {
				success: true,
				status: response.status,
				data: transformedData,
			};
		} catch (error: any) {
			// Lidar com erros
			const errorResponse = error?.response;

			return {
				success: false,
				data: errorResponse ? errorResponse.data : null,
				status: errorResponse ? errorResponse.status : null,
			};
		}
	}

	// Métodos auxiliares para GET, POST, PUT, DESTROY
	protected get<T>(url: string, headers?: AxiosRequestConfig['headers']): Promise<RequestResponse<T>> {
		return this.request<T>('GET', url, undefined, headers);
	}

	protected post<T>(url: string, data: any, headers?: AxiosRequestConfig['headers']): Promise<RequestResponse<T>> {
		return this.request<T>('POST', url, data, headers);
	}

	protected put<T>(url: string, data: any, headers?: AxiosRequestConfig['headers']): Promise<RequestResponse<T>> {
		return this.request<T>('PUT', url, data, headers);
	}

	protected delete<T>(url: string, headers?: AxiosRequestConfig['headers']): Promise<RequestResponse<T>> {
		return this.request<T>('DELETE', url, undefined, headers);
	}
}