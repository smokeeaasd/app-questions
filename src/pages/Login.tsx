import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorList from "../components/ErrorList";
import { useAuth } from "../contexts/AuthContext";
import { AuthService } from "../services/authService";
import { Validator } from "../utils/validator";
import { UserLoginData } from "../types/User";

type FormValidationResults = {
	email: boolean;
};

export default function Login() {
	const navigate = useNavigate();
	const { saveToken } = useAuth();
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [formValidation, setFormValidation] = useState<FormValidationResults | null>(null);
	const [errors, setErrors] = useState<string[]>([]);
	const [isActive, setIsActive] = useState(true);

	// Cria uma instância do AuthService
	const authService = new AuthService();

	// Manipulador de mudança nos campos do formulário
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	// Função para validar o formulário
	const validateForm = () => {
		const { email } = formData;
		const validationResults: FormValidationResults = {
			email: Validator.validateEmail(email),
		};
		setFormValidation(validationResults);
		setErrors([]);
	};

	// Atualiza a lista de erros com base nos resultados da validação do formulário
	useEffect(() => {
		if (formValidation) {
			const errorMessages: string[] = [];
			if (!formValidation.email) {
				errorMessages.push('Your email must be in the format "xxxxxxx@email.com".');
			}
			setErrors(errorMessages);
		}
	}, [formValidation]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		setIsActive(false);
		event.preventDefault();
		validateForm();

		const isFormValid = formValidation ? Object.values(formValidation).every(Boolean) : false;
		if (isFormValid) {
			const loginData: UserLoginData = {
				email: formData.email,
				password: formData.password,
			};

			try {
				const response = await authService.login(loginData);

				if (response.success && response.data) {
					saveToken(response.data.token);
					navigate("/app/dashboard");
				} else {
					setErrors([...errors, "Incorrect email or password"]);
				}
			} catch (error) {
				console.error("Error logging in:", error);
				setErrors([...errors, "Error logging in. Please try again later."]);
			}
		}

		setIsActive(true);
	};

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
			{errors.length > 0 && <ErrorList errors={errors} />}

			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-white">
					Login to your account
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				{/* Formulário de login */}
				<form className="space-y-6" onSubmit={handleSubmit}>
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
								onChange={handleInputChange}
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
								onChange={handleInputChange}
								className="bg-zinc-900 block w-full rounded-md border-0 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-700 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={!isActive}
							className={`transition-colors flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${!isActive ? 'opacity-50' : ''}`}
						>
							Login
						</button>

						<p className="mt-10 text-center text-md text-gray-500">
							Not a member?
							<span>&nbsp;</span>
							<Link to="/register" className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500">
								Sign up
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}