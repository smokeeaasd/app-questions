import { useState } from "react";

type AnswerInputProps = {
	onSubmit: (answer: string) => Promise<boolean>;
}

export default function AnswerInput({ onSubmit }: AnswerInputProps) {
	const [answerText, setAnswerText] = useState("");

	const handleAnswerChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
		setAnswerText(ev.target.value);
	};

	const handleAnswerSubmit = async () => {
		const success = await onSubmit(answerText);
		if (success) {
			setAnswerText("");
		}
	};

	const isSubmitEnabled = answerText.trim() !== "";

	return (
		<div>
			<div className="overflow-hidden rounded-lg border border-zinc-800 shadow-sm focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500">
				<textarea
					rows={2}
					name="description"
					id="description"
					className="bg-zinc-900 block w-full resize-none border-0 py-2 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
					placeholder="Write an answer..."
					onChange={handleAnswerChange}
					value={answerText}
				/>
			</div>

			<div className="flex justify-end mt-2">
				<button
					type="submit"
					disabled={!isSubmitEnabled}
					onClick={handleAnswerSubmit}
					className={`inline-flex items-center rounded-md px-6 py-2 text-sm font-semibold text-white shadow-sm ${isSubmitEnabled ? "bg-emerald-600 hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600" : "bg-emerald-600 opacity-75"}`}
				>
					Submit
				</button>
			</div>
		</div>
	);
}