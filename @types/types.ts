import NextAuth, { DefaultSession } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
// export interface PlannedMonth {
//     [key: string]: string,
// }
export interface PlannedMonth {
  [key: string]: {
    [key: string]: string | boolean;
  };
}

export interface Category {
  ingredients: any;
  id: number;
  name: string;
  ingredient: Ingredient[];
  isOpen?: boolean;
}

// export interface Food {
// 	name: string;
// 	quantity: number;
// }
export interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  category: string;
}

export interface ListItem {
  id: number;
  name: string;
  quantity: number;
}

export interface Meal {
  id: string;
  name: string;
  ingredients: string[];
}

export const startingPlannedMeals = {
  January: {
    // Initialize planned meals for the month with empty strings
    1: { name: "", checked: false },
    2: { name: "", checked: false },
    3: { name: "", checked: false },
    4: { name: "", checked: false },
    5: { name: "", checked: false },
    6: { name: "", checked: false },
    7: { name: "", checked: false },
    8: { name: "", checked: false },
    9: { name: "", checked: false },
    10: { name: "", checked: false },
    11: { name: "", checked: false },
    12: { name: "", checked: false },
    13: { name: "", checked: false },
    14: { name: "", checked: false },
    15: { name: "", checked: false },
    16: { name: "", checked: false },
    17: { name: "", checked: false },
    18: { name: "", checked: false },
    19: { name: "", checked: false },
    20: { name: "", checked: false },
    21: { name: "", checked: false },
    22: { name: "", checked: false },
    23: { name: "", checked: false },
    24: { name: "", checked: false },
    25: { name: "", checked: false },
    26: { name: "", checked: false },
    27: { name: "", checked: false },
    28: { name: "", checked: false },
    29: { name: "", checked: false },
    30: { name: "", checked: false },
    31: { name: "", checked: false },
  },
  February: {
    // Initialize planned meals for the month with empty strings
    1: { name: "", checked: false },
    2: { name: "", checked: false },
    3: { name: "", checked: false },
    4: { name: "", checked: false },
    5: { name: "", checked: false },
    6: { name: "", checked: false },
    7: { name: "", checked: false },
    8: { name: "", checked: false },
    9: { name: "", checked: false },
    10: { name: "", checked: false },
    11: { name: "", checked: false },
    12: { name: "", checked: false },
    13: { name: "", checked: false },
    14: { name: "", checked: false },
    15: { name: "", checked: false },
    16: { name: "", checked: false },
    17: { name: "", checked: false },
    18: { name: "", checked: false },
    19: { name: "", checked: false },
    20: { name: "", checked: false },
    21: { name: "", checked: false },
    22: { name: "", checked: false },
    23: { name: "", checked: false },
    24: { name: "", checked: false },
    25: { name: "", checked: false },
    26: { name: "", checked: false },
    27: { name: "", checked: false },
    28: { name: "", checked: false },
    29: { name: "", checked: false },
    30: { name: "", checked: false },
    31: { name: "", checked: false },
  },
  March: {
    // Initialize planned meals for the month with empty strings
    1: { name: "", checked: false },
    2: { name: "", checked: false },
    3: { name: "", checked: false },
    4: { name: "", checked: false },
    5: { name: "", checked: false },
    6: { name: "", checked: false },
    7: { name: "", checked: false },
    8: { name: "", checked: false },
    9: { name: "", checked: false },
    10: { name: "", checked: false },
    11: { name: "", checked: false },
    12: { name: "", checked: false },
    13: { name: "", checked: false },
    14: { name: "", checked: false },
    15: { name: "", checked: false },
    16: { name: "", checked: false },
    17: { name: "", checked: false },
    18: { name: "", checked: false },
    19: { name: "", checked: false },
    20: { name: "", checked: false },
    21: { name: "", checked: false },
    22: { name: "", checked: false },
    23: { name: "", checked: false },
    24: { name: "", checked: false },
    25: { name: "", checked: false },
    26: { name: "", checked: false },
    27: { name: "", checked: false },
    28: { name: "", checked: false },
    29: { name: "", checked: false },
    30: { name: "", checked: false },
    31: { name: "", checked: false },
  },
  April: {
    // Initialize planned meals for the month with empty strings
    1: { name: "", checked: false },
    2: { name: "", checked: false },
    3: { name: "", checked: false },
    4: { name: "", checked: false },
    5: { name: "", checked: false },
    6: { name: "", checked: false },
    7: { name: "", checked: false },
    8: { name: "", checked: false },
    9: { name: "", checked: false },
    10: { name: "", checked: false },
    11: { name: "", checked: false },
    12: { name: "", checked: false },
    13: { name: "", checked: false },
    14: { name: "", checked: false },
    15: { name: "", checked: false },
    16: { name: "", checked: false },
    17: { name: "", checked: false },
    18: { name: "", checked: false },
    19: { name: "", checked: false },
    20: { name: "", checked: false },
    21: { name: "", checked: false },
    22: { name: "", checked: false },
    23: { name: "", checked: false },
    24: { name: "", checked: false },
    25: { name: "", checked: false },
    26: { name: "", checked: false },
    27: { name: "", checked: false },
    28: { name: "", checked: false },
    29: { name: "", checked: false },
    30: { name: "", checked: false },
    31: { name: "", checked: false },
  },
  May: {
    // Initialize planned meals for the month with empty strings
    1: { name: "", checked: false },
    2: { name: "", checked: false },
    3: { name: "", checked: false },
    4: { name: "", checked: false },
    5: { name: "", checked: false },
    6: { name: "", checked: false },
    7: { name: "", checked: false },
    8: { name: "", checked: false },
    9: { name: "", checked: false },
    10: { name: "", checked: false },
    11: { name: "", checked: false },
    12: { name: "", checked: false },
    13: { name: "", checked: false },
    14: { name: "", checked: false },
    15: { name: "", checked: false },
    16: { name: "", checked: false },
    17: { name: "", checked: false },
    18: { name: "", checked: false },
    19: { name: "", checked: false },
    20: { name: "", checked: false },
    21: { name: "", checked: false },
    22: { name: "", checked: false },
    23: { name: "", checked: false },
    24: { name: "", checked: false },
    25: { name: "", checked: false },
    26: { name: "", checked: false },
    27: { name: "", checked: false },
    28: { name: "", checked: false },
    29: { name: "", checked: false },
    30: { name: "", checked: false },
    31: { name: "", checked: false },
  },
  June: {
    // Initialize planned meals for the month with empty strings
    1: { name: "", checked: false },
    2: { name: "", checked: false },
    3: { name: "", checked: false },
    4: { name: "", checked: false },
    5: { name: "", checked: false },
    6: { name: "", checked: false },
    7: { name: "", checked: false },
    8: { name: "", checked: false },
    9: { name: "", checked: false },
    10: { name: "", checked: false },
    11: { name: "", checked: false },
    12: { name: "", checked: false },
    13: { name: "", checked: false },
    14: { name: "", checked: false },
    15: { name: "", checked: false },
    16: { name: "", checked: false },
    17: { name: "", checked: false },
    18: { name: "", checked: false },
    19: { name: "", checked: false },
    20: { name: "", checked: false },
    21: { name: "", checked: false },
    22: { name: "", checked: false },
    23: { name: "", checked: false },
    24: { name: "", checked: false },
    25: { name: "", checked: false },
    26: { name: "", checked: false },
    27: { name: "", checked: false },
    28: { name: "", checked: false },
    29: { name: "", checked: false },
    30: { name: "", checked: false },
    31: { name: "", checked: false },
  },
  July: {
    // Initialize planned meals for the month with empty strings
    1: { name: "", checked: false },
    2: { name: "", checked: false },
    3: { name: "", checked: false },
    4: { name: "", checked: false },
    5: { name: "", checked: false },
    6: { name: "", checked: false },
    7: { name: "", checked: false },
    8: { name: "", checked: false },
    9: { name: "", checked: false },
    10: { name: "", checked: false },
    11: { name: "", checked: false },
    12: { name: "", checked: false },
    13: { name: "", checked: false },
    14: { name: "", checked: false },
    15: { name: "", checked: false },
    16: { name: "", checked: false },
    17: { name: "", checked: false },
    18: { name: "", checked: false },
    19: { name: "", checked: false },
    20: { name: "", checked: false },
    21: { name: "", checked: false },
    22: { name: "", checked: false },
    23: { name: "", checked: false },
    24: { name: "", checked: false },
    25: { name: "", checked: false },
    26: { name: "", checked: false },
    27: { name: "", checked: false },
    28: { name: "", checked: false },
    29: { name: "", checked: false },
    30: { name: "", checked: false },
    31: { name: "", checked: false },
  },
  August: {
    // Initialize planned meals for the month with empty strings
    1: { name: "", checked: false },
    2: { name: "", checked: false },
    3: { name: "", checked: false },
    4: { name: "", checked: false },
    5: { name: "", checked: false },
    6: { name: "", checked: false },
    7: { name: "", checked: false },
    8: { name: "", checked: false },
    9: { name: "", checked: false },
    10: { name: "", checked: false },
    11: { name: "", checked: false },
    12: { name: "", checked: false },
    13: { name: "", checked: false },
    14: { name: "", checked: false },
    15: { name: "", checked: false },
    16: { name: "", checked: false },
    17: { name: "", checked: false },
    18: { name: "", checked: false },
    19: { name: "", checked: false },
    20: { name: "", checked: false },
    21: { name: "", checked: false },
    22: { name: "", checked: false },
    23: { name: "", checked: false },
    24: { name: "", checked: false },
    25: { name: "", checked: false },
    26: { name: "", checked: false },
    27: { name: "", checked: false },
    28: { name: "", checked: false },
    29: { name: "", checked: false },
    30: { name: "", checked: false },
    31: { name: "", checked: false },
  },
  September: {
    // Initialize planned meals for the month with empty strings
    1: { name: "", checked: false },
    2: { name: "", checked: false },
    3: { name: "", checked: false },
    4: { name: "", checked: false },
    5: { name: "", checked: false },
    6: { name: "", checked: false },
    7: { name: "", checked: false },
    8: { name: "", checked: false },
    9: { name: "", checked: false },
    10: { name: "", checked: false },
    11: { name: "", checked: false },
    12: { name: "", checked: false },
    13: { name: "", checked: false },
    14: { name: "", checked: false },
    15: { name: "", checked: false },
    16: { name: "", checked: false },
    17: { name: "", checked: false },
    18: { name: "", checked: false },
    19: { name: "", checked: false },
    20: { name: "", checked: false },
    21: { name: "", checked: false },
    22: { name: "", checked: false },
    23: { name: "", checked: false },
    24: { name: "", checked: false },
    25: { name: "", checked: false },
    26: { name: "", checked: false },
    27: { name: "", checked: false },
    28: { name: "", checked: false },
    29: { name: "", checked: false },
    30: { name: "", checked: false },
    31: { name: "", checked: false },
  },
  October: {
    // Initialize planned meals for the month with empty strings
    1: { name: "", checked: false },
    2: { name: "", checked: false },
    3: { name: "", checked: false },
    4: { name: "", checked: false },
    5: { name: "", checked: false },
    6: { name: "", checked: false },
    7: { name: "", checked: false },
    8: { name: "", checked: false },
    9: { name: "", checked: false },
    10: { name: "", checked: false },
    11: { name: "", checked: false },
    12: { name: "", checked: false },
    13: { name: "", checked: false },
    14: { name: "", checked: false },
    15: { name: "", checked: false },
    16: { name: "", checked: false },
    17: { name: "", checked: false },
    18: { name: "", checked: false },
    19: { name: "", checked: false },
    20: { name: "", checked: false },
    21: { name: "", checked: false },
    22: { name: "", checked: false },
    23: { name: "", checked: false },
    24: { name: "", checked: false },
    25: { name: "", checked: false },
    26: { name: "", checked: false },
    27: { name: "", checked: false },
    28: { name: "", checked: false },
    29: { name: "", checked: false },
    30: { name: "", checked: false },
    31: { name: "", checked: false },
  },
  November: {
    // Initialize planned meals for the month with empty strings
    1: { name: "", checked: false },
    2: { name: "", checked: false },
    3: { name: "", checked: false },
    4: { name: "", checked: false },
    5: { name: "", checked: false },
    6: { name: "", checked: false },
    7: { name: "", checked: false },
    8: { name: "", checked: false },
    9: { name: "", checked: false },
    10: { name: "", checked: false },
    11: { name: "", checked: false },
    12: { name: "", checked: false },
    13: { name: "", checked: false },
    14: { name: "", checked: false },
    15: { name: "", checked: false },
    16: { name: "", checked: false },
    17: { name: "", checked: false },
    18: { name: "", checked: false },
    19: { name: "", checked: false },
    20: { name: "", checked: false },
    21: { name: "", checked: false },
    22: { name: "", checked: false },
    23: { name: "", checked: false },
    24: { name: "", checked: false },
    25: { name: "", checked: false },
    26: { name: "", checked: false },
    27: { name: "", checked: false },
    28: { name: "", checked: false },
    29: { name: "", checked: false },
    30: { name: "", checked: false },
    31: { name: "", checked: false },
  },
  December: {
    // Initialize planned meals for the month with empty strings
    1: { name: "", checked: false },
    2: { name: "", checked: false },
    3: { name: "", checked: false },
    4: { name: "", checked: false },
    5: { name: "", checked: false },
    6: { name: "", checked: false },
    7: { name: "", checked: false },
    8: { name: "", checked: false },
    9: { name: "", checked: false },
    10: { name: "", checked: false },
    11: { name: "", checked: false },
    12: { name: "", checked: false },
    13: { name: "", checked: false },
    14: { name: "", checked: false },
    15: { name: "", checked: false },
    16: { name: "", checked: false },
    17: { name: "", checked: false },
    18: { name: "", checked: false },
    19: { name: "", checked: false },
    20: { name: "", checked: false },
    21: { name: "", checked: false },
    22: { name: "", checked: false },
    23: { name: "", checked: false },
    24: { name: "", checked: false },
    25: { name: "", checked: false },
    26: { name: "", checked: false },
    27: { name: "", checked: false },
    28: { name: "", checked: false },
    29: { name: "", checked: false },
    30: { name: "", checked: false },
    31: { name: "", checked: false },
  },
};
