import React from "react";

type Props = {
	onClick: (event: any) => void;
};

export default function IncrementIcon({ onClick }: Props) {
	return (
		<svg
			className="bg-green-500 cursor-pointer text-white fill-white mx-1 rounded-md mr-1"
			onClick={onClick}
			xmlns="http://www.w3.org/2000/svg"
			height="24"
			viewBox="0 -960 960 960"
			width="24"
		>
			<path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
		</svg>
	);
}
