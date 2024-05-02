import { Link } from "react-router-dom";
import { UserData } from "../types/User";
import AccountIcon from "./AccountIcon";

type ProfileProps = {
	user: UserData
}

export default function Profile(props: ProfileProps) {
	return (
		<div className="flex items-center space-x-3">
			<div className="w-12 h-12 flex-shrink-0">
				<AccountIcon name={props.user.name.toUpperCase()} color="pink-600" />
			</div>
			<div className="space-y-1">
				<div className="text-sm font-medium text-gray-900">{props.user.name}</div>
				<div className="flex items-center">
					<span className="text-sm font-medium text-blue-500">
						<Link to={"/settings"}>Account details</Link>
					</span>
				</div>
			</div>
		</div>
	)
}