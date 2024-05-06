import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorList from "../components/ErrorList";
import { useAuth } from "../contexts/AuthContext";
import { AuthService } from "../services/authService"; // Importando AuthService
import { Validator } from "../utils/validator";

type FormRegisterResult = {
	email: boolean;
	name: boolean;
	password: boolean;
};

export default function Register() {
	const navigate = useNavigate();
	const { saveToken } = useAuth();

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [active, setActive] = useState(true);
	const [formResults, setFormResults] = useState<FormRegisterResult | null>(null);
	const [errors, setErrors] = useState<string[]>([]);

	// Cria uma instância de AuthService
	const authService = new AuthService();

	// Manipulador de mudança nos campos do formulário
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	// Valida o formulário com base nas regras definidas
	const validateForm = () => {
		const { name, email, password } = formData;
		const newFormResults: FormRegisterResult = {
			name: name !== '',
			email: Validator.validateEmail(email),
			password: Validator.validatePassword(password),
		};

		setFormResults(newFormResults);
		setErrors(getFormErrors(newFormResults));
	};

	// Gera a lista de erros com base nos resultados da validação do formulário
	const getFormErrors = (results: FormRegisterResult): string[] => {
		const errorMessages: string[] = [];
		if (!results.name) {
			errorMessages.push("You must enter your name.");
		}
		if (!results.email) {
			errorMessages.push("Your email must be in the format 'xxxxxxx@email.com'.");
		}
		if (!results.password) {
			errorMessages.push("Your password must be at least 8 characters long.");
		}
		return errorMessages;
	};

	// Manipulador de envio do formulário
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setActive(false);
		validateForm();

		const isFormValid = formResults ? Object.values(formResults).every(Boolean) : false;
		if (isFormValid) {
			try {
				const response = await authService.register(formData);

				console.log(response);
				if (response.success && response.data) {
					const login = await authService.login({
						email: formData.email,
						password: formData.password
					});
					if (login.success && login.data)
						saveToken(login.data.token);
					navigate("/app/dashboard");
				} else {
					setErrors([response.data?.message || "Registration failed. Please try again."]);
				}
			} catch (error) {
				console.error("Error registering:", error);
				setErrors(["Error registering. Please try again later."]);
			}
		}

		setActive(true);
	};

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
			{errors.length > 0 && <ErrorList errors={errors} />}

			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-white">
					Create an account
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-6" onSubmit={handleSubmit}>
					<div>
						<label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-200">
							Name
						</label>
						<div className="mt-2">
							<input
								id="name"
								name="name"
								type="text"
								required
								value={formData.name}
								onChange={handleChange}
								className="bg-zinc-900 block w-full rounded-md border-0 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-700 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-200">
							Email address
						</label>
						<div className="mt-2">
							<input
								id="email"
								name="email"
								type="email"
								required
								value={formData.email}
								onChange={handleChange}
								className="bg-zinc-900 block w-full rounded-md border-0 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-700 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-200">
								Password
							</label>
						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="password"
								required
								value={formData.password}
								onChange={handleChange}
								className="bg-zinc-900 block w-full rounded-md border-0 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-700 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={!active}
							className={`transition-colors flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${!active ? 'opacity-50' : ''}`}
						>
							Sign up
						</button>

						<p className="mt-10 text-center text-md text-gray-500">
							Have an account?
							<span>&nbsp;</span>
							<Link to="/login" className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500">
								Sign in
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}