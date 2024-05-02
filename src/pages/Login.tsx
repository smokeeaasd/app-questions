import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorList from "../components/ErrorList";
import { useAuth } from "../contexts/AuthContext";
import User from "../models/User";
import { Validator } from "../utils/validator";

type FormLoginResult = {
	email: boolean,
}

export default function Login() {
	const navigate = useNavigate();
	const { saveToken } = useAuth();
	const [active, setActive] = useState(true);

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [formResults, setFormResults] = useState<FormLoginResult | null>(null);
	const [errors, setErrors] = useState<string[]>([]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const validateForm = () => {
		const { email } = formData;
		const newFormResults: FormLoginResult = {
			email: Validator.validateEmail(email),
		};

		setErrors([]);
		setFormResults(newFormResults);
	};

	const getFormErrors = () => {
		const errors: string[] = [];
		if (formResults) {
			if (!formResults.email) errors.push('Your email must be in the format "xxxxxxx@email.com".');
		}
		return errors;
	};

	useEffect(() => {
		if (formResults) {
			setErrors(getFormErrors());
		}
	}, [formResults]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		setActive(false);
		event.preventDefault();
		validateForm();
		const isFormValid = formResults ? Object.values(formResults).every((v) => v) : false;
		if (isFormValid) {
			const body = { email: formData.email, password: formData.password };

			const loginData = await User.login(body);

			if (loginData != null) {
				const token = loginData.token;
				saveToken(token);
				navigate("/app/dashboard");
			}

			setErrors([...errors, "Incorrect email or password"]);
		}

		setActive(true);
	};

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
			{(errors.length > 0) && <ErrorList errors={errors} />}
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
					Login to account
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				{/* Form */}
				<form className="space-y-6" onSubmit={handleSubmit}>
					<div>
						<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
							Email address
						</label>
						<div className="mt-2">
							<input
								id="email"
								name="email"
								type="text"
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-700 sm:text-sm sm:leading-6"
								onChange={handleChange}
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
								Password
							</label>
						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="password"
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-700 sm:text-sm sm:leading-6"
								onChange={handleChange}
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							onClick={validateForm}
							className={"transition-colors flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 " + (!active ? "opacity-50" : "")}
							disabled={!active}
						>
							Login
						</button>

						<p className="mt-10 text-center text-md text-gray-500">
							Not a member?
							<span>&nbsp;</span>
							<Link to="/register" className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500">Sign up</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	)
}