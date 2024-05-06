import { UserIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import ActionButtons from '../components/ActionButtons'
import Profile from '../components/Profile'
import ActionButtonsSkeleton from '../components/Skeletons/ActionButtonsSkeleton'
import ProfileSkeleton from '../components/Skeletons/ProfileSkeleton'
import { useAuth } from '../contexts/AuthContext'
import { UserService } from '../services/userService'
import { QuestionData } from '../types/Question'
import { UserData } from '../types/User'
import Dashboard from './Dashboard'
import ViewQuestion from './ViewQuestion'
import { QuestionService } from '../services/questionService'
import NewQuestion from './NewQuestion'

export default function Application() {
	const [user, setUser] = useState<UserData>();
	const [questions, setQuestions] = useState<QuestionData[]>();

	const auth = useAuth();
	const location = useLocation();

	async function loadUser() {
		const token = auth.getToken();
		const userService = new UserService();
		const user = await userService.user(token!);

		if (user.success && user.data != null) {
			setUser(user.data);
		}
	}

	async function loadQuestions() {
		const token = auth.getToken();
		const questionService = new QuestionService();
		const questions = await questionService.index(token!);

		if (questions.success && questions.data) {
			setQuestions(questions.data);
		}
	}

	useEffect(() => {
		loadUser();
		loadQuestions();
	}, [location]);

	return (
		<>
			<div className="relative flex min-h-full flex-col">
				<div className="w-full flex-grow lg:flex">
					<div className="min-w-0 flex-1 bg-zinc-950 xl:flex">
						<div className="bg-zinc-950 xl:w-72 xl:flex-shrink-0 xl:border-r xl:border-zinc-900 xl:flex xl:flex-col xl:items-center px-2">
							<div className="xl:fixed py-6 sm:px-6 lg:px-8">
								<div className="flex items-center justify-between xl:px-4 xl:w-72">
									<div className="flex-1 space-y-8 w-full">
										<div className="space-y-8 sm:flex sm:items-center sm:justify-between sm:space-y-0 xl:block xl:space-y-8">
											{
												user
													?
													<>
														<Profile user={user} />
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
										{
											user
												?
												<div className="flex flex-col space-y-6 sm:flex-row sm:space-x-8 sm:space-y-0 xl:flex-col xl:space-x-0 xl:space-y-6">
													<div className="flex items-center space-x-2">
														<UserIcon className="h-5 w-5 text-gray-200" aria-hidden="true" />
														<span className="text-sm font-medium text-slate-400">Member since</span>
														<span className='text-sm font-medium text-slate-300'>{new Date(user.created_at).toDateString()}</span>
													</div>
												</div>
												:
												<div className='h-5 bg-gray-700 animate-pulse rounded-md' />}
									</div>
								</div>
							</div>
						</div>
						<Routes>
							<Route path='dashboard' element={
								<Dashboard user={user!} questions={questions!} />
							} />
							<Route path='questions/:id' element={
								<ViewQuestion />
							} />
							<Route path='questions/create' element={
								<NewQuestion />
							} />
							<Route path='*' element={<Navigate to={'dashboard'} />} />
						</Routes>
					</div>
				</div>
			</div>
		</>
	)
}