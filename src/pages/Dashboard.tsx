import { useEffect, useState } from 'react';
import ActivityList from '../components/ActivityList';
import QuestionCard from '../components/Question/QuestionCard';
import ActivityListSkeleton from '../components/Skeletons/ActivityListSkeleton';
import { AnswerData } from '../types/Answer';
import { QuestionData } from '../types/Question';
import { UserData } from '../types/User';

type DashboardProps = {
	user: UserData
	questions?: QuestionData[];
};

export default function Dashboard({ user, questions }: DashboardProps) {
	const [activities, setActivities] = useState<ActivityData[] | null>(null);

	// Efeito para atualizar atividades com base nas props
	useEffect(() => {
		if (user && questions) {
			const combinedActivities = [...user.answers || [], ...user.questions || []];
			combinedActivities.sort((actA, actB) => new Date(actB.created_at).getTime() - new Date(actA.created_at).getTime());

			// Converte atividades combinadas em dados de atividade
			// O ID da atividade é o mesmo do ID da questão associada
			const activityData = combinedActivities.map((activity) => {
				const isQuestion = 'title' in activity;

				const questionId = isQuestion ? activity.id : (activity as AnswerData).question_id;
				return {
					date: activity.created_at,
					type: isQuestion ? 'question' : 'answer',
					title: isQuestion ? (activity as QuestionData).title : `View question #${activity.question_id}`,
					id: questionId,  // O ID é o ID da questão associada
				};
			}) as ActivityData[];

			setActivities(activityData);
		}
	}, [user, questions]);

	return (
		<>
			<div className="mx-auto w-full flex-grow lg:flex">
				<div className="min-w-0 flex-1 bg-zinc-950 xl:flex min-h-screen">
					<div className="bg-zinc-950 lg:min-w-0 lg:flex-1 min-h-screen">
						<div className="border-b border-t border-zinc-900 shadow-sm pb-4 pl-4 pr-6 pt-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6">
							<div className="flex items-center">
								<h1 className="flex-1 text-lg font-medium text-white">Questions</h1>
							</div>
						</div>
						{questions ? (
							<ul role="list" className="divide-y divide-zinc-900 border-b border-zinc-900">
								{questions.map((question) => (
									<QuestionCard data={question} key={question.id} />
								))}
							</ul>
						) : (
							<div className="m-4 h-24 bg-gray-700 animate-pulse flex justify-center items-center p-4 rounded-md" />
						)}
					</div>
				</div>

				<div className="bg-zinc-950 pr-4 sm:pr-6 lg:flex-shrink-0 lg:border-l lg:border-zinc-900 lg:pr-8 xl:pr-0">
					<div className="pl-6 lg:w-80 px-6">
						<div className="pb-2 pt-6">
							<h2 className="text-sm font-semibold text-white">Recent activity</h2>
						</div>
						<div>
							{activities ? (
								<ActivityList data={activities} />
							) : (
								<ActivityListSkeleton />
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}