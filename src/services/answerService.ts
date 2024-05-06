import { AnswerData, AnswerSaveData, AnswerUpdateData } from "../types/Answer";
import { BaseService, RequestResponse } from "./baseService";
import IService from "./crud";

export class AnswerService extends BaseService implements IService<AnswerData> {
	// Implementação de index para buscar todas as respostas
	async index(token: string): Promise<RequestResponse<AnswerData[]>> {
		const headers = {
			'Authorization': `Bearer ${token}`,
		};

		return this.get<AnswerData[]>("/api/answers", headers);
	}

	// Implementação de store para salvar uma nova resposta
	async store(token: string, data: AnswerSaveData) {
		const headers = {
			'Authorization': `Bearer ${token}`,
		};

		// Usa o método POST da classe base para realizar a requisição
		return this.post<AnswerData>(`/api/questions/${data.questionId}/answers`, data, headers);
	}

	// Implementação de show para buscar uma resposta específica por ID
	async show(token: string, id: string) {
		const headers = {
			'Authorization': `Bearer ${token}`,
		};

		return this.get<AnswerData>(`/api/answers/${id}`, headers);
	}

	// Implementação de update para atualizar uma resposta específica por ID
	async update(token: string, id: string, data: AnswerUpdateData) {
		const headers = {
			'Authorization': `Bearer ${token}`,
		};

		return this.put<AnswerData>(`/api/questions/${data.questionId}/answers/${id}`, data, headers);
	}

	// Implementação de destroy para deletar uma resposta específica
	async destroy(token: string, id: string, questionId: string) {
		const headers = {
			'Authorization': `Bearer ${token}`,
		};

		return this.delete<AnswerData>(`/api/questions/${questionId}/answers/${id}`, headers);
	}
}