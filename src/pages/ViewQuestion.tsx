import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AnswerCard from '../components/Answers/AnswerCard';
import AnswerInput from '../components/Answers/AnswerInput';
import Badge from '../components/Badge';
import CheckModal from '../components/Modals/CheckModal';
import DeleteModal from '../components/Modals/DeleteModal';
import UncheckModal from '../components/Modals/UncheckModal';
import QuestionHead from '../components/Question/QuestionHead';
import { useAuth } from '../contexts/AuthContext';
import { AnswerService } from '../services/answerService';
import { QuestionService } from '../services/questionService';
import { UserService } from '../services/userService';
import { AnswerData } from '../types/Answer';
import { QuestionData } from '../types/Question';
import { UserData } from '../types/User';

type ModalState = {
	delete: boolean;
	check: boolean;
	uncheck: boolean;
};

export default function ViewQuestion() {
	const [modalState, setModalState] = useState<ModalState>({ delete: false, check: false, uncheck: false });
	const [selectedAnswer, setSelectedAnswer] = useState<AnswerData | null>();
	const [currentUser, setCurrentUser] = useState<UserData>();
	const [currentQuestion, setCurrentQuestion] = useState<QuestionData>();

	const navigate = useNavigate();
	const auth = useAuth();
	const { id } = useParams();

	const sortAnswersByMostRecent = (answers: AnswerData[]): AnswerData[] => {
		// Define a função de comparação personalizada
		return answers.sort((a, b) => {
			// Se uma das respostas é aceita, ela deve vir antes
			if (a.accepted && !b.accepted) {
				return -1; // Resposta "a" vem antes
			} else if (!a.accepted && b.accepted) {
				return 1; // Resposta "b" vem antes
			}

			// Se ambas as respostas são ou não aceitas, ordena por data de criação
			return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
		});
	};

	const handleDeleteAnswer = async (confirm: boolean) => {
		const token = auth.getToken();
		if (token && selectedAnswer) {
			if (confirm) {
				const { id } = selectedAnswer;

				try {
					const answerService = new AnswerService();
					await answerService.destroy(token, id, currentQuestion?.id!);
					const updatedAnswers = currentQuestion?.answers.filter((answer) => answer.id !== id);

					if (updatedAnswers && currentQuestion) {
						setCurrentQuestion({
							...currentQuestion,
							answers: sortAnswersByMostRecent(updatedAnswers),
						});
					}

					setModalState({ ...modalState, delete: false });
				} catch (error) {
					console.error('Error deleting answer:', error);
				}
			} else {
				setModalState({ ...modalState, delete: false });
			}
		}
	};

	const handleAcceptAnswer = async (confirm: boolean) => {
		const token = auth.getToken();
		if (token && selectedAnswer) {
			if (confirm) {
				const answerService = new AnswerService();
				try {
					const response = await answerService.update(token, selectedAnswer.id, {
						accepted: true,
						answer: selectedAnswer.answer,
						questionId: selectedAnswer.question_id,
					});

					if (response.success && response.data) {
						const updatedAnswers = currentQuestion?.answers.map((answer) => {
							if (answer.id === selectedAnswer.id) {
								return {
									...answer,
									accepted: true,
								};
							}
							return answer;
						});

						if (updatedAnswers && currentQuestion) {
							setCurrentQuestion({
								...currentQuestion,
								answers: sortAnswersByMostRecent(updatedAnswers),
							});
						}

						setModalState({ ...modalState, check: false });
					} else {
						console.error('Failed to check answer:', response.status);
					}
				} catch (error) {
					console.error('Error accepting answer:', error);
				}
			} else {
				setModalState({ ...modalState, check: false });
			}
		}
	};

	const handleNotAcceptAnswer = async (confirm: boolean) => {
		const token = auth.getToken();
		if (token && selectedAnswer) {
			if (confirm) {
				const answerService = new AnswerService();
				try {
					const response = await answerService.update(token, selectedAnswer.id, {
						accepted: false,
						answer: selectedAnswer.answer,
						questionId: selectedAnswer.question_id,
					});

					if (response.success && response.data) {
						const updatedAnswers = currentQuestion?.answers.map((answer) => {
							if (answer.id === selectedAnswer.id) {
								return {
									...answer,
									accepted: false,
								};
							}
							return answer;
						});

						if (updatedAnswers && currentQuestion) {
							setCurrentQuestion({
								...currentQuestion,
								answers: sortAnswersByMostRecent(updatedAnswers),
							});
						}

						setModalState({ ...modalState, uncheck: false });
					} else {
						console.error('Failed to uncheck answer:', response.status);
					}
				} catch (error) {
					console.error('Error unchecking answer:', error);
				}
			} else {
				setModalState({ ...modalState, uncheck: false });
			}
		}
	};

	const loadQuestionData = async () => {
		const token = auth.getToken();
		if (token && id) {
			const questionService = new QuestionService();
			const userService = new UserService();
			try {
				const question = await questionService.show(token, id);
				const author = await userService.user(token);
				if (question.success && question.data && author.success && author.data) {
					question.data.answers = sortAnswersByMostRecent(question.data.answers);
					setCurrentUser(author.data);
					setCurrentQuestion(question.data);
				} else {
					navigate('/app/dashboard');
				}
			} catch (error) {
				console.error('Error loading question data:', error);
				navigate('/app/dashboard');
			}
		}
	};

	const handleNewAnswerSubmit = async (answerText: string) => {
		const token = auth.getToken();
		if (token && currentQuestion) {
			try {
				const answerService = new AnswerService();

				const newAnswer = await answerService.store(token, {
					answer: answerText,
					questionId: currentQuestion.id
				});

				if (newAnswer.data && newAnswer.success) {
					setCurrentQuestion({
						...currentQuestion,
						answers: sortAnswersByMostRecent([...currentQuestion.answers, newAnswer.data])
					});
					return true;
				}
			} catch (error) {
				console.error('Error submitting new answer:', error);
				return false;
			}
		}
		return false;
	};

	useEffect(() => {
		loadQuestionData();
	}, [auth, id, navigate]);

	return (
		<div className="mx-auto w-full flex-grow lg:flex">
			<div className="min-w-0 flex-1 bg-zinc-950 min-h-screen p-8">
				{currentQuestion && (
					<>
						<div>
							<div className='grid grid-cols-2 justify-items-start items-center'>
								<div className='flex flex-col'>
									<p className='text-2xl text-nowrap'>
										<span className='font-semibold text-gray-400'>#{currentQuestion.id}</span>
										<span>&nbsp;</span>
										<span className='font-semibold text-gray-200'>{currentQuestion.title}</span>
									</p>
								</div>
								<Link
									to="/app/dashboard"
									className="justify-self-end w-fit rounded-md bg-zinc-900 px-3 py-2 text-sm font-semibold text-gray-200 shadow-sm ring-1 ring-inset ring-zinc-800 hover:bg-zinc-800"
								>
									Back
								</Link>
							</div>
							{
								currentQuestion.categories.length > 0 &&
								<div className='flex items-center'>
									<h1 className='text-2xl font-medium text-gray-200 mr-2'>Tags: </h1>
									<div className='my-1 flex flex-wrap items-center'>
										{currentQuestion.categories.map((cat) => (
											<div className='mx-0.5 truncate ' key={cat.id}>
												<Badge type={cat.name.toLowerCase()} solid />
											</div>
										))}
									</div>
								</div>
							}
						</div>

						<div>
							<QuestionHead data={currentQuestion} />

							{currentQuestion.answers.length > 0 ? (
								<div>
									{currentQuestion.answers.map((answer) => (
										<AnswerCard
											key={answer.id}
											data={answer}
											question={currentQuestion}
											user={currentUser!}
											onDelete={() => {
												setModalState({ check: false, delete: true, uncheck: false });
												setSelectedAnswer(answer);
											}}
											onCheck={() => {
												setModalState({ check: true, delete: false, uncheck: false });
												setSelectedAnswer(answer);
											}}
											onUncheck={() => {
												setModalState({ check: false, delete: false, uncheck: true });
												setSelectedAnswer(answer);
											}}
										/>
									))}
								</div>
							) : (
								<p className='mb-4 text-gray-200 font-semibold text-2xl'>
									No answers yet. Be the first to answer this question.
								</p>
							)}

							{modalState.check && (
								<CheckModal
									target={selectedAnswer!}
									open={modalState.check}
									onClose={handleAcceptAnswer}
								/>
							)}

							{modalState.delete && (
								<DeleteModal
									target={selectedAnswer!}
									open={modalState.delete}
									onClose={handleDeleteAnswer}
								/>
							)}

							{modalState.uncheck && (
								<UncheckModal
									target={selectedAnswer!}
									open={modalState.uncheck}
									onClose={handleNotAcceptAnswer}
								/>
							)}

							<AnswerInput onSubmit={handleNewAnswerSubmit} />
						</div>
					</>
				)}
			</div>
		</div>
	);
}