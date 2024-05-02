import { Link } from "react-router-dom"
import formatDate from "../utils/date"

type ActivityListProps = {
	data: ActivityData[],
}
export default function ActivityList(props: ActivityListProps) {
	return (
		<ul role="list" className="divide-y divide-gray-200">
			{props.data.map((item, index) => (
				<li key={index} className="py-4">
					<div className="flex space-x-3">
						<div className={`h-6 w-6 rounded-full flex justify-center items-center text-gray-400 group-hover:text-gray-500 ${item.type == 'question' ? 'bg-pink-600' : 'bg-yellow-600'}`}>
							<span className="text-white text-sm font-semibold">{item.type[0].toUpperCase()}</span>
						</div>
						<div className="flex-1 space-y-1">
							<div className="flex items-center justify-between">
								<h3 className="text-sm font-medium">{item.type == 'question' ? 'Opened a question' : 'Answered a question'}</h3>
								<p className="text-sm text-gray-500">{formatDate(new Date(item.date))}</p>
							</div>
							<Link to={`/app/questions/${item.id}`} className="text-blue-500">
								<p className="text-sm">
									{item.title}
								</p>
							</Link>
						</div>
					</div>
				</li>
			))}
		</ul>
	)
}