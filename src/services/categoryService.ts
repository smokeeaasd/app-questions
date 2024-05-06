import { CategoryData } from "../types/Category";
import { BaseService, RequestResponse } from "./baseService";
import IService from "./crud";

export class CategoryService extends BaseService implements IService<CategoryData> {
	// Implementação de store para criar uma nova categoria (não implementada)
	store(token: string, data: CategoryData): Promise<RequestResponse<CategoryData>> {
		throw new Error("Method not implemented.");
	}

	// Implementação de update para atualizar uma categoria específica (não implementada)
	update(token: string, id: string, data: CategoryData): Promise<RequestResponse<CategoryData>> {
		throw new Error("Method not implemented.");
	}

	// Implementação de destroy para deletar uma categoria específica (não implementada)
	destroy(token: string, id: string): Promise<RequestResponse<CategoryData>> {
		throw new Error("Method not implemented.");
	}

	// Implementação de index para buscar todas as categorias
	async index(token: string): Promise<RequestResponse<CategoryData[]>> {
		const headers = {
			'Authorization': `Bearer ${token}`,
		};

		// Usa o método GET da classe base para realizar a requisição
		return this.get<CategoryData[]>("/api/categories", headers);
	}

	// Implementação de show para buscar uma categoria específica por ID
	async show(token: string, id: string): Promise<RequestResponse<CategoryData>> {
		const headers = {
			'Authorization': `Bearer ${token}`,
		};

		// Usa o método GET da classe base para realizar a requisição
		return this.get<CategoryData>(`/api/categories/${id}`, headers);
	}
}