import { Menu, Transition } from "@headlessui/react";
import { CheckCircleIcon, EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Fragment, useMemo } from "react";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark as colorTheme } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { AnswerData } from "../../types/Answer";
import { QuestionData } from "../../types/Question";
import { UserData } from "../../types/User";
import formatDate from "../../utils/date";
import AccountIcon from "../AccountIcon";

type AnswerCardProps = {
	data: AnswerData;
	question: QuestionData;
	user: UserData;
	onDelete?: () => void;
	onCheck?: () => void;
	onUncheck?: () => void;
};

export default function AnswerCard({ data, question, user, onDelete, onCheck, onUncheck }: AnswerCardProps) {
	const acceptedAnswerExists = useMemo(() => question.answers.some((a) => a.accepted), [question.answers]);
	return (
		<div className="my-4">
			<div className={`border ${data.accepted ? "border-emerald-600" : "border-zinc-800"} bg-zinc-900 p-4 w-full rounded-md`}>
				<div className="grid grid-cols-2 items-center">
					<div className="flex items-center">
						<div className="w-8 h-8 font-semibold text-lg">
							<AccountIcon color="pink-600" name={data.user.name} />
						</div>
						<p className="text-lg ml-2">
							<span className="text-gray-200 font-medium">{data.user.name}</span>
							<span className="text-gray-400 text-sm mx-3">{formatDate(new Date(data.created_at))}</span>
						</p>
					</div>
					<div className="justify-self-end">
						{question.user_id === user.id && (
							<Menu as="div" className="relative inline-block text-left">
								<div>
									<Menu.Button className="flex items-center rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500">
										<span className="sr-only">Open options</span>
										<EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
									</Menu.Button>
								</div>

								<Transition
									as={Fragment}
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items className="bg-zinc-800 absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
										<div className="py-1">

											<>
												<Menu.Item>

													<button
														onClick={onDelete}
														className='group flex w-full items-center font-medium px-4 py-2 text-sm text-red-500 hover:text-red-600'
													>
														<TrashIcon className="mr-3 h-5 w-5 text-red-500 group-hover:text-red-600" aria-hidden="true" />
														Delete
													</button>
												</Menu.Item>
												{data.accepted ? (
													<Menu.Item>
														<button
															onClick={onUncheck}
															className='group flex w-full items-center font-medium px-4 py-2 text-sm text-gray-400 hover:text-gray-500'
														>
															<CheckCircleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
															Uncheck
														</button>
													</Menu.Item>
												) : (
													!acceptedAnswerExists && 
													<Menu.Item>
														<button
															onClick={onCheck}
															className='group flex w-full items-center font-medium px-4 py-2 text-sm text-emerald-500 hover:text-emerald-600'
														>
															<CheckCircleIcon className="mr-3 h-5 w-5 text-emerald-500 group-hover:text-emerald-600" aria-hidden="true" />
															Check
														</button>
													</Menu.Item>
												)}
											</>
										</div>
									</Menu.Items>
								</Transition>
							</Menu>
						)}
					</div>
				</div>
				<div className="text-md ml-1 my-2 text-white">
					<Markdown
						remarkPlugins={[remarkGfm]}
						rehypePlugins={[rehypeRaw]}
						components={{
							code({ node, inline, className, children, ...props }: any) {
								const match = /language-(\w+)/.exec(className || '');
								return !inline && match ? (
									<SyntaxHighlighter
										customStyle={{ borderRadius: '6px' }}
										style={colorTheme}
										PreTag="div"
										language={match[1]}
										{...props}
									>
										{String(children).replace(/\n$/, '')}
									</SyntaxHighlighter>
								) : (
									<code className={className} {...props}>
										{children}
									</code>
								);
							},
						}}
					>
						{data.answer}
					</Markdown>
				</div>
			</div>
		</div>
	);
}