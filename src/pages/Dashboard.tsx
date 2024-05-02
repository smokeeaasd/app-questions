import { useEffect, useState } from 'react'
import ActivityList from '../components/ActivityList'
import Loader from '../components/Loader'
import QuestionCard from '../components/Question/QuestionCard'
import { useAuth } from '../contexts/AuthContext'
import Question from '../models/Question'
import User from '../models/User'
import { AnswerData } from '../types/Answer'
import { QuestionCompleteData, QuestionData } from '../types/Question'
import { UserData } from '../types/User'

export default function Dashboard() {
	const [user, setUser] = useState<{ data: UserData, questions?: QuestionData[], answers?: AnswerData[] }>();
	const [questions, setQuestions] = useState<QuestionCompleteData[]>();
	const [activities, setActivities] = useState<ActivityData[]>();
	const auth = useAuth();

	async function loadUser() {
		const token = auth.getToken();
		const userClient = new User(token!);
		const userData = await userClient.me();

		if (userData != null) {
			const userQuestions = await userClient.questions(10);
			const userAnswers = await userClient.answers();

			setUser({
				data: userData,
				questions: userQuestions!,
				answers: userAnswers!
			});
		}
	}

	async function loadQuestions() {
		const token = auth.getToken();
		const questions = await Question.all(token!);

		if (questions) {
			setQuestions(questions);
		}
	}

	useEffect(() => {
		loadUser();
		loadQuestions();
	}, []);

	useEffect(() => {
		if (user) {
			const activities = [...user.answers!, ...user.questions!];
			activities.sort((act_a, act_b) => Date.parse(act_a.created_at.toString()) - Date.parse(act_b.created_at.toString()));
			setActivities(activities.map((act) => {
				return {
					date: act.created_at,
					type: (act as AnswerData).question_id ? 'answer' : 'question',
					title: (act as QuestionData).description ? `${(act as QuestionData).title}` : "View",
					id: act.id
				}
			}));
		}
	}, [user]);

	return (
		<>
			<div className="mx-auto w-full flex-grow lg:flex">
				<div className="min-w-0 flex-1 bg-white xl:flex min-h-screen">
					{/* Questions List */}
					<div className="bg-white lg:min-w-0 lg:flex-1 min-h-screen">
						<div className="border-b border-t border-gray-200 shadow-sm pb-4 pl-4 pr-6 pt-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6">
							<div className="flex items-center">
								<h1 className="flex-1 text-lg font-medium">Questions</h1>
							</div>

						</div>
						{questions ?
							<ul role="list" className="divide-y divide-gray-200 border-b border-gray-200">
								{questions.map((question) => (
									<QuestionCard data={question} key={question.id} />
								))}
							</ul>
							: <div className='w-full flex justify-center itens-center p-4'><Loader /></div>
						}
					</div>
				</div>
				{/* Activity feed */}
				<div className="bg-gray-50 pr-4 sm:pr-6 lg:flex-shrink-0 lg:border-l lg:border-gray-200 lg:pr-8 xl:pr-0">
					<div className="pl-6 lg:w-80 px-6">
						<div className="pb-2 pt-6">
							<h2 className="text-sm font-semibold">Recent activity</h2>
						</div>
						<div>
							{
								activities
									? <ActivityList data={activities} />
									: <div className='animate-pulse'><div className='w-full h-12 bg-gray-400 rounded-md my-4' /><div className='w-full h-12 bg-gray-400 rounded-md my-4' /></div>
							}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}