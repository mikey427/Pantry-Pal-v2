import React from "react";

type Props = {
	onClick: (event: any) => void;
};

export default function Decrement({ onClick }: Props) {
	return (
		<svg
			className="bg-red-500 cursor-pointer fill-white mx-1 rounded-md text-xs font-bold"
			onClick={onClick}
			xmlns="http://www.w3.org/2000/svg"
			height="24"
			viewBox="0 -960 960 960"
			width="24"
		>
			<path d="M200-440v-80h560v80H200Z" />
		</svg>
	);
}
