import { EnvelopeIcon } from "@heroicons/react/20/solid";

export default function ProfileSkeleton() {
	return (
	<div className="flex items-center space-x-3">
		<div className="h-12 w-12 flex-shrink-0">
			<div className="w-12 h-12 rounded-full bg-gray-700"/>
		</div>
		<div className="space-y-1">
			<div className="text-sm font-medium text-gray-900 mt-2.5">
				<div className="w-36 h-2.5 bg-gray-700 rounded"/>
			</div>
			<div className="group flex items-center space-x-2.5">
				<svg
					className="h-5 w-5 text-gray-700 group-hover:text-gray-500"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<EnvelopeIcon/>
				</svg>
				<span className="text-sm font-medium text-gray-500 group-hover:text-gray-900">
				<div className="w-24 h-2.5 bg-gray-700 rounded"/>
				</span>
			</div>
		</div>
	</div>
	)
}