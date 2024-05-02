export default function formatDate(date: Date): string {
	const today = new Date(); // Pega a data atual

	// Remove a hora, minutos, segundos e milissegundos para comparar apenas a data
	today.setHours(0, 0, 0, 0);
	date.setHours(0, 0, 0, 0);

	// Comparar as datas
	if (date.getTime() === today.getTime()) {
		return "today"; // Se a data fornecida é a mesma que a data de hoje
	}

	// Subtrair um dia da data atual para verificar se é "yesterday"
	today.setDate(today.getDate() - 1);
	if (date.getTime() === today.getTime()) {
		return "yesterday"; // Se a data fornecida é igual à data de ontem
	}

	// Caso contrário, retorne a data no formato ISO como string
	return date.toISOString().split('T')[0];
}