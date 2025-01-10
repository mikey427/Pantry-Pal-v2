// Data Types
const calendarData = {
  // Initialize planned meals for the month with empty strings
  1: {
    mealId: null,
    name: "",
    checked: false,
  },
  2: {
    mealId: null,
    name: "",
    checked: false,
  },
  3: { mealId: null, name: "", checked: false },
  4: { mealId: null, name: "", checked: false },
  5: { mealId: null, name: "", checked: false },
  6: { mealId: null, name: "", checked: false },
  7: { mealId: null, name: "", checked: false },
  8: { mealId: null, name: "", checked: false },
  9: { mealId: null, name: "", checked: false },
  10: { mealId: null, name: "", checked: false },
  11: { mealId: null, name: "", checked: false },
  12: { mealId: null, name: "", checked: false },
  13: { mealId: null, name: "", checked: false },
  14: { mealId: null, name: "", checked: false },
  15: { mealId: null, name: "", checked: false },
  16: { mealId: null, name: "", checked: false },
  17: { mealId: null, name: "", checked: false },
  18: { mealId: null, name: "", checked: false },
  19: { mealId: null, name: "", checked: false },
  20: { mealId: null, name: "", checked: false },
  21: { mealId: null, name: "", checked: false },
  22: { mealId: null, name: "", checked: false },
  23: { mealId: null, name: "", checked: false },
  24: { mealId: null, name: "", checked: false },
  25: { mealId: null, name: "", checked: false },
  26: { mealId: null, name: "", checked: false },
  27: { mealId: null, name: "", checked: false },
  28: { mealId: null, name: "", checked: false },
  29: { mealId: null, name: "", checked: false },
  30: { mealId: null, name: "", checked: false },
  31: { mealId: null, name: "", checked: false },
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
