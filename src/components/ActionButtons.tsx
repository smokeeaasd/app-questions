import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"

export default function ActionButtons() {
	const auth = useAuth();
	const navigate = useNavigate();
	function handleLogout() {
		auth.clearToken();
		navigate("/login");

	}
	return (
		<div className="flex flex-col sm:flex-row xl:flex-col">
			<button
				type="button"
				className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 xl:w-full"
			>
				New Question
			</button>
			<button
				type="button"
				onClick={() => handleLogout()}
				className="mt-3 inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 xl:ml-0 xl:mt-3 xl:w-full"
			>
				Log out
			</button>
		</div>
	)
}