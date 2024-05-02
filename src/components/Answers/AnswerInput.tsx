import { ChangeEvent, useEffect, useState } from "react";

export default function AnswerInput() {
	const [enabled, setEnabled] = useState<boolean>(false);
	const [answer, setAnswer] = useState("");

	useEffect(() => {
		setEnabled(answer != "");
	}, [answer]);

	function updateAnswer(ev: ChangeEvent<HTMLTextAreaElement>) {
		setAnswer(ev.target.value);
	}

	return (
		<div>
			<div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500">
				<label htmlFor="description" className="sr-only">
					Description
				</label>
				<textarea
					rows={2}
					name="description"
					id="description"
					className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
					placeholder="Write an answer..."
					onChange={updateAnswer}
					defaultValue={''}
				/>
			</div>

			<div>
				<div className="flex justify-end mt-2">
					<button
						type="submit"
						disabled={true}
						className={"inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm bg-emerald-600 " + (enabled ? "hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600" : "opacity-75")}
					>
						Send
					</button>
				</div>
			</div>
		</div>
	)
}
