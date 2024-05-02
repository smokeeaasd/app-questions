import { StarIcon } from "@heroicons/react/24/solid";
import { QuestionCompleteData } from "../../types/Question";
import formatDate from "../../utils/date";
import AccountIcon from "../AccountIcon";

type QuestionHeadProps = {
	data: QuestionCompleteData
}

export default function QuestionHead(props: QuestionHeadProps) {
	return (
		<div className="my-4">
			<div className="border border-gray-300 p-2 rounded-md w-full">
				<div className='flex items-center'>
					<div className='w-8 h-8 font-semibold text-lg'>
						<AccountIcon color='pink-600' name={props.data?.user.name!} />
					</div>
					<div className="mx-2">
					<StarIcon width={24} color="#f5a905"/>
					</div>
					<p className='text-lg'>
						<span className='text-gray-700 font-semibold'>{props.data.user.name}</span>
						<span>&nbsp;</span>
						<span>&middot;</span>
						<span>&nbsp;</span>
						<span className='text-gray-400 font-semibold'>{formatDate(new Date(props.data.created_at))}</span>
					</p>
				</div>

				<p className='text-xl ml-1 my-2 font-medium'>
					<span className='text-slate-800'>{props.data.description}</span>
				</p>
			</div>
		</div>
	)
}