import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "../components/Badge";
import { useAuth } from "../contexts/AuthContext";
import { CategoryService } from "../services/categoryService";
import { QuestionService } from "../services/questionService";
import { UserService } from "../services/userService";
import { CategoryData } from "../types/Category";
import { UserData } from "../types/User";

export default function NewQuestion() {
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [selectedCategories, setSelectedCategories] = useState<CategoryData[]>([]);
	const [currentUser, setCurrentUser] = useState<UserData | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [categories, setCategories] = useState<CategoryData[]>([]);

	const auth = useAuth();
	const navigate = useNavigate();
	const token = auth.getToken();

	const fetchCategories = useCallback(async () => {
		try {
			const categoryService = new CategoryService();
			const response = await categoryService.index(token!);
			if (response.success && response.data) {
				setCategories(response.data);
			}
		} catch (error) {
			console.error("Error fetching categories:", error);
		}
	}, [token]);

	const fetchCurrentUser = useCallback(async () => {
		try {
			const userService = new UserService();
			const response = await userService.user(token!);
			if (response.success && response.data) {
				setCurrentUser(response.data);
			}
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	}, [token]);

	useEffect(() => {
		fetchCategories();
		fetchCurrentUser();
	}, [fetchCategories, fetchCurrentUser]);

	const handleCategoryClick = useCallback(
		(category: CategoryData) => {
			setSelectedCategories((prev) => {
				if (prev.includes(category)) {
					return prev.filter((c) => c.id !== category.id);
				}
				return [...prev, category];
			});
		},
		[]
	);

	const handleSubmitQuestion = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);

		try {
			const questionService = new QuestionService();
			const questionData = {
				title,
				description,
				user_id: currentUser?.id,
			};

			const questionResponse = await questionService.store(token!, questionData);
			if (questionResponse.success && questionResponse.data) {
				const questionId = questionResponse.data.id;

				if (selectedCategories.length > 0) {
					const categoriesResponse = await questionService.setCategories(token!, questionId, {
						categories: selectedCategories.map((c) => c.id),
					});

					if (!categoriesResponse.success) {
						throw new Error("Error associating categories");
					}
				}

				navigate(`/app/questions/${questionId}`);
			}
		} catch (error) {
			console.error("Error submitting question:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const isSubmitEnabled = title != "" && description != "" && !isLoading;

	return (
		<div className="mx-auto w-full flex-grow lg:flex">
			<div className="min-w-0 flex-1 bg-zinc-950 min-h-screen p-8">
				<form onSubmit={handleSubmitQuestion}>
					<div className="border border-white/10 rounded-md p-4">
						<h1 className="text-4xl font-bold text-white">Create a question</h1>

						<div className="mt-6">
							<div className="mb-8">
								<label htmlFor="title" className="block text-sm font-medium leading-6 text-white">
									Title
								</label>
								<div className="mt-2">
									<input
										required
										id="title"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										className="block xl:w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div className="my-8">
								<label htmlFor="description" className="block text-sm font-medium leading-6 text-white">
									Description
								</label>
								<div className="mt-2">
									<textarea
										required
										id="description"
										spellCheck={false}
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										className="resize-none block w-full xl:min-h-32 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div className="mt-8">
								<p className="block text-sm font-medium leading-6 text-white">Categories</p>
								<div className="mt-2 flex flex-wrap">
									{categories.map((category) => (
										<div
											key={category.id}
											className="m-1 hover:cursor-pointer"
											onClick={() => handleCategoryClick(category)}
										>
											<Badge type={category.name} solid={selectedCategories.includes(category)} />
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					<div className="mt-3 flex items-center justify-end gap-x-6">
						<Link to="/app/dashboard" className="text-sm font-semibold leading-6 text-white">
							Cancel
						</Link>
						<button
							type="submit"
							disabled={!isSubmitEnabled}
							className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${isSubmitEnabled ? 'bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500' : 'opacity-50'}`}
						>
							Create Question
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}