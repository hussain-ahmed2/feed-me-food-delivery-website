export default function Skeleton({ className, color = "bg-zinc-300" }) {
	return (
		<div
			className={`animate-pulse transition-all duration-300 ${color} ${className}`}
		/>
	);
}
