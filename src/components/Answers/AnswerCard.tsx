import { AnswerCompleteData } from "../../types/Answer"
import formatDate from "../../utils/date"
import AccountIcon from "../AccountIcon"

type AnswerCardProps = {
	data: AnswerCompleteData
}
export default function AnswerCard(props: AnswerCardProps) {
	return (
		<div className="my-4">
			<div className="border border-gray-300 p-2 rounded-md w-full">
				<div className='flex items-center'>
					<div className='w-8 h-8 font-semibold text-lg'>
						<AccountIcon color='pink-600' name={props.data?.user.name!} />
					</div>
					<p className='text-lg ml-2'>
						<span className='text-gray-700 font-semibold'>{props.data.user.name}</span>
						<span>&nbsp;</span>
						<span>&middot;</span>
						<span>&nbsp;</span>
						<span className='text-gray-400 font-semibold'>{formatDate(new Date(props.data.created_at))}</span>
					</p>
				</div>

				<p className='text-md ml-1 my-2'>
					<span className='text-slate-800'>{props.data.answer}</span>
				</p>
			</div>
		</div>
	)
}