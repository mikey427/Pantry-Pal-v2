// export interface PlannedMonth {
//     [key: string]: string,
// }
export interface PlannedMonth {
	[key: string]: {
		[key: string]: string | boolean;
	};
}

export interface Category {
	id: number;
	name: string;
	foods: Food[];
	isOpen?: boolean;
}

// export interface Food {
// 	name: string;
// 	quantity: number;
// }
export interface Food {
	id: number;
	name: string;
	quantity: number;
	category: string;
}

export interface ListItem {
	name: string;
	quantity: number;
}

export interface Meal {
	id: string;
	name: string;
	ingredients: string[];
}
