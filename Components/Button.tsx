"use client";
import React from "react";

// type Props = {
// 	callback?: () => void;
// 	width?: string;
// 	height?: string;
// 	text?: string;
// 	color?: string;
// 	hoverColor?: string;
// 	textColor?: string;
// 	isSubmit?: boolean;
// };
type Props = {
	callback?: (event?: any) => void;
	text?: string;
	styles?: string;
	isSubmit?: boolean;
	defaultBtn?: boolean;
};

export default function Button({ callback, text, styles, isSubmit, defaultBtn = true }: Props) {
	return (
		<button
			type={isSubmit ? "submit" : "button"}
			className={
				defaultBtn
					? `btn bg-accent hover:bg-indigo-800 text-white px-4 py-2 rounded-md ${styles} `
					: `btn bg-accent text-white px-4 py-2 rounded-md ${styles} `
			}
			onClick={event => {
				if (callback) {
					callback(event);
				}
			}}
		>
			{text}
		</button>
	);
}

// Old styles: btn bg-accent hover:bg-indigo-800 text-white px-4 py-2 rounded-md mb-4 mr-3
// If i run into buttons looking weird, add the following to the button className: mb-4 mr-3
// New: btn bg-accent hover:bg-indigo-800 text-white px-4 py-2 rounded-md
