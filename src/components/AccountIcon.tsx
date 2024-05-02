type AccountIconProps = {
	name: string,
	color: string
}
export default function AccountIcon(props: AccountIconProps) {
	return (
		<div className={`bg-${props.color} flex justify-center items-center w-full h-full rounded-full`}>
			<span className="text-white font-semibold">{props.name[0]}</span>
		</div>
	)
}