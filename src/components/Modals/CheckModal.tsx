import { Dialog, Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Fragment, useRef, useState } from 'react';
import { AnswerData } from '../../types/Answer';

type ModalProps = {
	target: AnswerData;
	open: boolean;
	onClose: (confirm: boolean) => Promise<void>;
};

export default function CheckModal({ target, open, onClose }: ModalProps) {
	const [enabled, setEnabled] = useState<boolean>(true);
	const cancelButtonRef = useRef(null);

	async function close(confirm: boolean) {
		setEnabled(false);
		await onClose(confirm);
		setEnabled(true);
	}

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="border border-zinc-800 relative transform overflow-hidden rounded-lg bg-zinc-950 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
								<div className="sm:flex sm:items-start">
									<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-900 sm:mx-0 sm:h-10 sm:w-10">
										<CheckCircleIcon className="h-6 w-6 text-emerald-600" aria-hidden="true" />
									</div>
									<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
										<Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-200">
											Accept {target.user.name}'s answer ?
										</Dialog.Title>
										<div className="mt-2">
											<p className="text-sm text-gray-300">
												The answer will be marked as accepted.
											</p>
										</div>
									</div>
								</div>
								<div className="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4">
									<button
										type="button"
										className="inline-flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 sm:w-auto"
										disabled={!enabled}
										onClick={() => close(true)}
									>
										Accept
									</button>
									<button
										type="button"
										className="mt-3 inline-flex w-full justify-center rounded-md bg-zinc-900 px-3 py-2 text-sm font-semibold text-gray-200 shadow-sm ring-1 ring-inset ring-zinc-800 hover:bg-zinc-950 sm:ml-3 sm:mt-0 sm:w-auto"
										disabled={!enabled}
										onClick={() => close(false)}
										ref={cancelButtonRef}
									>
										Cancel
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}