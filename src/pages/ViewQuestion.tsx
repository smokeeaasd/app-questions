import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import QuestionHead from '../components/Question/QuestionHead'
import { useAuth } from '../contexts/AuthContext'
import Question from '../models/Question'
import { QuestionCompleteData } from '../types/Question'
import AnswerCard from '../components/Answers/AnswerCard'
import AnswerInput from '../components/Answers/AnswerInput'

export default function ViewQuestion() {
	const [question, setQuestion] = useState<QuestionCompleteData>();
	const auth = useAuth();
	const { id } = useParams();

	async function loadQuestion() {
		const token = auth.getToken();
		const questionClient = new Question(token!, id!);

		const question = await questionClient.get();

		if (question) {
			setQuestion(question);
		}
	}

	useEffect(() => {
		loadQuestion();
	}, []);

	return (
		<>
			<div className="mx-auto w-full flex-grow lg:flex">
				<div className="min-w-0 flex-1 bg-gray-50 min-h-screen p-8">
					{
						question &&
						<>
							<div className='grid grid-cols-2 justify-items-start'>
								<p className='text-3xl'>
									<span className='font-semibold text-gray-400'>#{question?.id}</span>
									<span>&nbsp;</span>
									<span className='font-semibold text-slate-900'>{question?.title}</span>
								</p>
 
								{/* <button className='justify-self-end bg-emerald-500 hover:bg-emerald-600 rounded-md px-4 text-white font-semibold'>
									Answer this question
								</button> */}
							</div>

							<div>
								<div>
									<QuestionHead data={question} />

									{
										question.answers.length >= 1
											?
											<div>
												{question.answers.map((a) => <AnswerCard data={a} key={a.id} />)}
											</div>
											:
											<p>
												No answers. be the first to answer this question
											</p>
									}
								</div>

								<AnswerInput/>
							</div>
						</>
					}
				</div>
			</div>
		</>
	)
}