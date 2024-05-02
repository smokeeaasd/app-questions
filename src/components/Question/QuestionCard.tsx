import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { QuestionCompleteData } from "../../types/Question";
import formatDate from "../../utils/date";
import { Link } from "react-router-dom";
import AccountIcon from "../AccountIcon";

type QuestionProps = {
	data: QuestionCompleteData
}

export default function QuestionCard({ data }: QuestionProps) {
	return (
		<li
			key={data.id}
			className="relative py-5 pl-4 pr-6 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6"
		>
			<div className="flex items-center justify-between space-x-4">
				{/* Repo name and link */}
				<div className="min-w-0 space-y-3">
					<div className="flex items-center space-x-3">

						<h2 className="text-sm font-medium">
							<Link to={`/app/questions/${data.id}`}>
								<span className="absolute inset-0" aria-hidden="true" />
								{data.title}{' '}
								<span className="sr-only">{data.answers.some((a) => a.accepted) ? 'Solved' : 'Not solved'}</span>
							</Link>
						</h2>
					</div>
					<div className="group relative flex items-center space-x-2.5">
						<div className="h-6 w-6 flex-shrink-0 text-sm">
							<AccountIcon name={data.user.name.toUpperCase()} color="pink-600" />
						</div>
						<span className="truncate text-sm font-medium text-gray-500">
							{data.user.name}
						</span>
					</div>
				</div>
				<div className="sm:hidden">
					<ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
				</div>
				{/* Repo meta info */}
				<div className="hidden flex-shrink-0 flex-col items-end space-y-3 sm:flex">
					<div className="flex items-center space-x-4">
						<p
							className="relative text-sm font-medium text-gray-500"
						>
							{data.answers.length} {data.answers.length == 1 ? "answer" : "answers"}
						</p>
					</div>
					<p className="flex space-x-2 text-sm text-gray-500">
						<span>{formatDate(new Date(Date.parse(data.created_at)))}</span>
					</p>
				</div>
			</div>
		</li>
	)
}
