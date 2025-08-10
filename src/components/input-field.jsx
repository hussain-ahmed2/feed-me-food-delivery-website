export default function InputField({ name, label, type = "text", placeholder = "Type here...", defaultValue = "", required = false, error = null, ref }) {
	return (
		<div className="flex flex-col gap-1">
			{label && (
				<label className="font-medium" htmlFor={name}>
					{label}
				</label>
			)}
			<input
				ref={(el) => (ref.current[name] = el)}
				className={`input ${error ? "ring-rose-300 border-rose-200" : "ring-gray-300"}`}
				type={type}
				name={name}
				id={name}
				placeholder={placeholder}
				defaultValue={defaultValue}
				required={required}
			/>
			<div className="overflow-hidden">
				<p className={`transition transform duration-300 text-sm text-rose-500 ${error ? "" : "scale-y-0 translate-x-full opacity-0"}`}>{error}</p>
			</div>
		</div>
	);
}
