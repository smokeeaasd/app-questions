export class Validator {
	private static emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	public static validateEmail(email: string): boolean {
		return this.emailRegex.test(email);
	}

	public static validatePassword(password: string): boolean {
		return password.length >= 8;
	}
}
