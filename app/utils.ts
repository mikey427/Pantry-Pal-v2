import SavedMeals from "./saved_meals/page";

export {};

// Data Types
const calendarData = {
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
};

const shoppingList = [
  {
    name: "Chicken",
    quantity: 2,
  },
];

const ingredients = [
  {
    id: 0,
    name: "Category 1",
    foods: [
      {
        id: 0,
        name: "Food 1",
        quantity: 1,
        category: "Category 1",
      },
      {
        id: 1,
        name: "Food 2",
        quantity: 2,
        category: "Category 1",
      },
    ],
  },
  {
    id: 1,
    name: "Category 2",
    foods: [
      {
        id: 0,
        name: "Food 3",
        quantity: 3,
        category: "Category 2",
      },
      {
        id: 1,
        name: "Food 4",
        quantity: 4,
        category: "Category 2",
      },
    ],
  },
];

const savedMeals = [
  {
    id: "1",
    name: "Meal 1",
    ingredients: ["Chicken", "Ketchup"],
  },
];

export const getMonthName = (index: number) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[index];
};

export const nthNumber = (number: number) => {
  if (number > 3 && number < 21) return "th";
  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const retrieveLocalData = (dataName: string, modifier?: string): any => {
  // console.log(dataName, modifier)
  let data: any;

  switch (dataName) {
    case "calendarData":
      // console.log("here");
      if (!modifier) {
        return;
      }
      data = localStorage.getItem(modifier);
      // console.log(data)
      if (!data) {
        console.log(modifier);
        // console.log("in if")
        localStorage.setItem(
          modifier || dataName,
          JSON.stringify(calendarData)
        );
      }
      break;
    case "ingredients":
      data = localStorage.getItem(dataName);
      if (!data) {
        localStorage.setItem("ingredients", JSON.stringify(ingredients));
      }
      break;
    case "shoppingList":
      data = localStorage.getItem(dataName);
      if (!data) {
        localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
      }
      break;
    case "savedMeals":
      data = localStorage.getItem(dataName);
      if (!data) {
        localStorage.setItem("savedMeals", JSON.stringify(savedMeals));
      }
      break;
    default:
      console.log("Error in retrieveLocalData function.");
      break;
  }
  // console.log(data)
  // console.log(JSON.parse(data))
  // console.log("Retrieved data:", data);
  if (!data) {
    return null; // or any other default value
  }
  return JSON.parse(data);
};

export const updateLocalData = (dataName: string, data: any): void => {
  localStorage.setItem(dataName, JSON.stringify(data));
};

//     "proteins": [],
//     "vegetables": [],
//     "grains": [],
//     "sauces, condiments and seasonings": [],
//     "dairy": [],
//     "fruits": []

// export const ingredientsData = [
// 	{
// 		Name: "Chicken",
// 		Category: "Meat"
// 	}
// ];
