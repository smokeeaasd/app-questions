import {
	CheckBadgeIcon
} from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ActionButtons from '../components/ActionButtons'
import Profile from '../components/Profile'
import ActionButtonsSkeleton from '../components/Skeletons/ActionButtonsSkeleton'
import ProfileSkeleton from '../components/Skeletons/ProfileSkeleton'
import { useAuth } from '../contexts/AuthContext'
import User from '../models/User'
import { AnswerData } from '../types/Answer'
import { QuestionData } from '../types/Question'
import { UserData } from '../types/User'
import Dashboard from './Dashboard'
import ViewQuestion from './ViewQuestion'

export default function Application() {
	const [user, setUser] = useState<{ data: UserData, questions?: QuestionData[], answers?: AnswerData[] }>();
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

	useEffect(() => {
		loadUser();
	}, []);

	return (
		<>
			<div className="relative flex min-h-full flex-col">
				{/* 3 column wrapper */}
				<div className="w-full flex-grow lg:flex">
					{/* Left sidebar & main wrapper */}
					<div className="min-w-0 flex-1 bg-white xl:flex">
						{/* Account profile */}
						<div className="bg-white xl:w-72 xl:flex-shrink-0 xl:border-r xl:border-gray-200 xl:flex xl:flex-col xl:items-center px-2">
							<div className="xl:fixed py-6 sm:px-6 lg:px-8">
								<div className="flex items-center justify-between xl:px-4 xl:w-72">
									<div className="flex-1 space-y-8 w-full">
										<div className="space-y-8 sm:flex sm:items-center sm:justify-between sm:space-y-0 xl:block xl:space-y-8">
											{/* Profile && Action Buttons */}
											{
												user
													?
													<>
														<Profile user={user.data} />
														<ActionButtons />
													</>
													:
													<div className='animate-pulse'>
														<div className='mb-8'>
															<ProfileSkeleton />
														</div>
														<div className='mt-4'>
															<ActionButtonsSkeleton />
														</div>
													</div>
											}
										</div>
										{/* Meta info */}
										<div className="flex flex-col space-y-6 sm:flex-row sm:space-x-8 sm:space-y-0 xl:flex-col xl:space-x-0 xl:space-y-6">
											<div className="flex items-center space-x-2">
												<CheckBadgeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
												<span className="text-sm font-medium text-gray-500">Premium User</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Question */}
						<Routes>
							<Route path='dashboard' Component={Dashboard}/>
							<Route path='questions/:id' Component={ViewQuestion} />
							<Route path='*' element={<Navigate to={'/dashboard'}/>}/>
						</Routes>
					</div>
				</div>
			</div>
		</>
	)
}