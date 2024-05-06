import { QuestionCompleteData } from "../../types/Question";
import formatDate from "../../utils/date";
import AccountIcon from "../AccountIcon";

type QuestionHeadProps = {
	data: QuestionCompleteData
}

export default function QuestionHead(props: QuestionHeadProps) {
	return (
		<div className="my-4">
			<div className="flex">
				<div className="h-6 bg-blue-600 rounded-t-md w-fit flex justify-center items-center px-2 mr-2">
					<p className="text-gray-200 font-medium">Author</p>
				</div>
				{
					props.data.answers.some((a) => a.accepted)
						?
						<div className="h-6 bg-emerald-600 rounded-t-md w-fit flex justify-center items-center px-2 mr-2">
							<p className="text-gray-200 font-medium">Answered</p>
						</div>
						:
						<div className="h-6 bg-yellow-600 rounded-t-md w-fit flex justify-center items-center px-2 mr-2">
							<p className="text-gray-200 font-medium">Not answered</p>
						</div>
				}
			</div>
			<div className="border border-zinc-800 bg-zinc-900 p-4 w-full rounded-tr-md rounded-b-md">
				<div>
					<div className='flex items-center'>
						<div className='w-8 h-8 font-semibold text-lg'>
							<AccountIcon color='pink-600' name={props.data?.user.name!} />
						</div>
						<p className='text-lg ml-2'>
							<span className='text-gray-200 font-semibold'>{props.data.user.name}</span>
							<span className='text-gray-400 text-sm mx-2'>{formatDate(new Date(props.data.created_at))}</span>
						</p>
					</div>

					<p className='text-xl ml-1 my-2 font-medium'>
						<span className='text-slate-200'>{props.data.description}</span>
					</p>
				</div>
			</div>
		</div>
	)
}