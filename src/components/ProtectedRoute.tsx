import { ReactNode, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
	children: ReactNode,
	redirect: string
};

export default function ProtectedRoute(props: ProtectedRouteProps) {
	const auth = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		const token = auth.getToken();
		if (!token) {
			navigate(props.redirect);
		}
	});

	return props.children
}