import { ReactNode, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

type OnlyGuestRouteProps = {
	children: ReactNode,
	redirect: string
};

export default function OnlyGuestRoute(props: OnlyGuestRouteProps) {
	const auth = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		const token = auth.getToken();
		if (token) {
			navigate(props.redirect);
		}
	});

	return props.children
}