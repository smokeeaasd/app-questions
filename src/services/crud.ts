import { RequestResponse } from "./baseService"; // Importe RequestResponse para uso em sua interface

// Defina um tipo genérico para os métodos
interface IService<T> {
	// Método para buscar todos os registros
	index(token: string): Promise<RequestResponse<T[]>>;

	// Método para criar um novo registro
	store(token: string, data: any): Promise<RequestResponse<T>>;

	// Método para buscar um registro específico por ID
	show(token: string, id: string): Promise<RequestResponse<T>>;

	// Método para atualizar um registro específico por ID
	update(token: string, id: string, data: any): Promise<RequestResponse<T>>;

	// Método para deletar um registro específico por ID
	destroy(token: string, data: string, ...args: any[]): Promise<RequestResponse<T>>;
}

export default IService;