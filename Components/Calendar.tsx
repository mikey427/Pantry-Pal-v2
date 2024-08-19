"use client";
import React, { useState, useEffect, useRef } from "react";
import { PlannedMonth, Meal, Category, Food } from "../app/types";
import {
  retrieveLocalData,
  updateLocalData,
  getMonthName,
  nthNumber,
} from "../app/utils";
import SavedMeals from "../app/saved_meals/page";

type Props = {};

export default function Calendar({}: Props) {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    new Date().getMonth()
  );
  const [selectedDay, setSelectedDay] = useState<string | null>();
  const [input, setInput] = useState("");
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [plannedMeals, setPlannedMeals] = useState<PlannedMonth>({
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
  });
  const [savedMeals, setSavedMeals] = useState<Meal[]>([]);
  const [ingredients, setIngredients] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showError, setShowError] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  let timer: any;

  const closeModal = (event: any) => {
    if (showModal && !modalRef.current?.contains(event.target)) {
      setShowModal(false);
      setInput("");
      clearTimeout(timer);
    }
  };
  if (typeof window !== "undefined") {
    document.addEventListener("mousedown", (event) => {
      closeModal(event);
    });
  }
  // Function to handle day selection
  const selectDay = (event: any, day: string): void => {
    event.stopPropagation();
    if (!day) {
      return; // Do nothing if day is empty
    }
    // Set input field with the planned meal for the selected day
    setInput(plannedMeals[day].name.toString());
    setSelectedDay(day);
  };

  const handleErrorMessage = async () => {
    setShowError(true);
    setTimeout(() => {
      timer = setShowError(false);
    }, 15000);
  };

  // Function to handle form submission
  const handleSubmit = (event: any, day: string): void => {
    // Check if the meal is already saved
    const mealExists = savedMeals.find((meal) => meal.name === input);
    if (!mealExists) {
      handleErrorMessage();
      return;
    }
    event.stopPropagation();
    // Update planned meal for the selected day
    let temp: any = plannedMeals;
    temp[Number(day)].name = input;

    // Clear input field and hide the form
    setInput("");
    setSelectedDay(null);
    setShowModal(false);

    // Update local storage with the modified planned meals data
    updateLocalData(getMonthName(currentMonthIndex), plannedMeals);
  };

  // Function to get the number of days in a month
  const numDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to get the days for the specified month
  const getDaysForMonth = (year: number, month: number) => {
    // Get the first day of the month and calculate the number of days in the month
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const firstDayOfMonth = new Date(year, month, 1);
    const startDay = daysOfWeek[firstDayOfMonth.getDay()];
    const daysInThisMonth = numDaysInMonth(year, month);

    // Create an array of days in the month
    const emptyCellsBeforeStart = Array.from(
      { length: daysOfWeek.indexOf(startDay) },
      (_, i) => {
        const day =
          numDaysInMonth(year, month - 1) -
          (daysOfWeek.indexOf(startDay) - i - 1);
        return day.toString();
      }
    );
    const daysOfMonth = Array.from({ length: daysInThisMonth }, (_, i) =>
      (i + 1).toString()
    );
    const emptyCellsAfterEnd = Array.from(
      { length: 7 - ((emptyCellsBeforeStart.length + daysOfMonth.length) % 7) },
      (_, i) => {
        const day = i + 1;
        return day.toString();
      }
    );
    const allDays = [
      ...emptyCellsBeforeStart,
      ...daysOfMonth,
      ...emptyCellsAfterEnd,
    ];

    // Split the days into weeks
    const weeks: string[][] = [];
    while (allDays.length > 0) {
      weeks.push(allDays.splice(0, 7));
    }
    if (String(weeks[weeks.length - 1]) === String([1, 2, 3, 4, 5, 6, 7])) {
      weeks.pop();
    }
    return weeks;
  };

  // Function to handle previous month button click
  const handlePrevMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex === 0 ? 11 : prevIndex - 1));
  };

  // Function to handle next month button click
  const handleNextMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex === 11 ? 0 : prevIndex + 1));
  };

  const ingredients12 = [
    {
      id: 1,
      name: "Category 1",
      foods: [
        {
          name: "Food 1",
          quantity: 1,
          catefor: "Category 1",
        },
        {
          name: "Food 2",
          quantity: 2,
          category: "Category 1",
        },
      ],
    },
  ];

  const handleCheck = (event: any, day: string, meal: string) => {
    event.stopPropagation();
    // Create a new object with the current state
    let tempPlannedMeals: any = { ...plannedMeals };
    // let tempPlannedMeals: any = JSON.parse(JSON.stringify(plannedMeals));
    // Update the checked property of the specific day
    tempPlannedMeals[day].checked = !tempPlannedMeals[day].checked;
    if (tempPlannedMeals[day].checked) {
      // Get the ingredients for the selected meal
      const mealIngredients = savedMeals.find(
        (savedMeal) => savedMeal.name === meal
      )?.ingredients;
      // Loop through the ingredients and update the quantities
      let tempIngredients = JSON.parse(JSON.stringify(ingredients));

      mealIngredients?.forEach((ingredient) => {
        const ingredientCategoryIndex = tempIngredients.findIndex(
          (category: Category) =>
            category.foods.find((food) => food.name === ingredient)?.name ===
            ingredient
        );

        if (ingredientCategoryIndex !== -1) {
          const foodItemIndex = tempIngredients[
            ingredientCategoryIndex
          ].foods.findIndex((food: Food) => food.name === ingredient);

          if (foodItemIndex !== -1) {
            tempIngredients[ingredientCategoryIndex].foods[
              foodItemIndex
            ].quantity -= 1;
            if (
              tempIngredients[ingredientCategoryIndex].foods[foodItemIndex]
                .quantity === 0
            ) {
              // Remove the ingredient if the quantity is zero
              tempIngredients[ingredientCategoryIndex].foods = tempIngredients[
                ingredientCategoryIndex
              ].foods.filter((food: Food) => food.name !== ingredient);
            }
          }
        }
        setIngredients(tempIngredients);
        updateLocalData("ingredients", tempIngredients);
      });

      setPlannedMeals(tempPlannedMeals);
      updateLocalData(getMonthName(currentMonthIndex), tempPlannedMeals);
    } else {
      const mealIngredients = savedMeals.find(
        (savedMeal) => savedMeal.name === meal
      )?.ingredients;
      let temp: any = [...ingredients];
      mealIngredients?.forEach((ingredient, idx) => {
        // grabs category of the ingredient, returns undefined if doesn't find it
        const ingredientCategory = ingredients.find((category) =>
          category.foods.some((food) => food.name === ingredient)
        );

        if (ingredientCategory !== undefined) {
          const foodItem = ingredientCategory?.foods.find(
            (food) => food.name === ingredient
          );

          if (foodItem) {
            foodItem.quantity += 1;
          }
        } else {
          //if ingredient category is undefined
          let unCatIndex: number;
          if (idx === 0) {
            unCatIndex = ingredients.findIndex(
              (category) => category.name === "Uncategorized"
            );
          } else {
            unCatIndex = temp.findIndex(
              (category: Category) => category.name === "Uncategorized"
            );
          }
          if (unCatIndex !== -1) {
            temp[unCatIndex].foods.push({
              id: temp[unCatIndex].foods.length,
              name: ingredient,
              quantity: 1,
              category: "Uncategorized",
            });
          } else {
            temp.push({
              id: ingredients.length,
              name: "Uncategorized",
              foods: [
                {
                  id: 1,
                  name: ingredient,
                  quantity: 1,
                  category: "Uncategorized",
                },
              ],
            });
          }
        }
      });
      setIngredients(temp);
      // Update local storage with the new ingredient data
      updateLocalData("ingredients", temp);
    }
  };

  const openModal = () => {
    if (selectedDay !== null) {
      const day = String(selectedDay);
      let temp: string = String(plannedMeals[day]?.name);
      setInput(temp);
    }
    setShowModal(true);
  };

  // Get current year, day, and month
  const currentYear = new Date().getFullYear();
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const daysInMonth = getDaysForMonth(currentYear, currentMonthIndex);

  // Effect hook to retrieve local data when currentMonthIndex changes
  useEffect(() => {
    setPlannedMeals(
      retrieveLocalData("calendarData", getMonthName(currentMonthIndex))
    );
    setSavedMeals(retrieveLocalData("savedMeals"));
    setIngredients(retrieveLocalData("ingredients"));
    setTimeout(() => setLoading(false), 500);
  }, [currentMonthIndex]);

  type Event = {
    id: number;
    name: string;
    time: string;
    datetime: string;
    href: string;
  };

  type Day = {
    date: string;
    isCurrentMonth?: boolean;
    isToday?: boolean;
    isSelected?: boolean;
    events: Event[];
  };

  function getCalendarMonth(year: number, month: number): Day[] {
    const result: Day[] = [];

    // Get the first day of the month
    const startDate = new Date(year, month, 1);

    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const startDay = startDate.getDay();

    // Add the trailing days from the previous month
    for (let i = startDay; i > 0; i--) {
      const prevDate = new Date(year, month, 1 - i);
      result.push({ date: prevDate.toISOString().split("T")[0], events: [] });
    }

    // Add the days of the current month
    const endDate = new Date(year, month + 1, 0); // Last day of the current month
    for (let i = startDate.getDate(); i <= endDate.getDate(); i++) {
      const date = new Date(year, month, i);
      result.push({
        date: date.toISOString().split("T")[0],
        isCurrentMonth: true,
        events: [],
      });
    }

    // Add the leading days from the next month
    const endDay = endDate.getDay();
    for (let i = 1; i < 7 - endDay; i++) {
      const nextDate = new Date(year, month + 1, i);
      result.push({ date: nextDate.toISOString().split("T")[0], events: [] });
    }

    return result;
  }

  function isSameDay(month: number, day: number): boolean {
    const today = new Date();
    return today.getMonth() === month && today.getDate() === day;
  }

  function isSameMonth(month: number, otherMonth: number): boolean {
    return month === otherMonth;
  }

  // Usage
  const calendarData = getCalendarMonth(2024, 2); // May 2024
  return (
    <>
      <div className="lg:flex lg:h-full lg:flex-col">
        <div className="w-3/4 mx-auto">
          <div className="w-full mx-auto border-b border-gray-700 pb-5">
            <h3 className="text-base font-semibold leading-6 text-white">
              Meal Planner
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              This is where you will coordinate the meals for the month. Click
              on a day, then click the + button to assign a meal to that day.
            </p>
          </div>
        </div>

        <header className="flex items-center justify-between px-6 py-4 lg:flex-none">
          <h1 className="text-base font-semibold leading-6 text-white">
            <time
              dateTime={`${currentYear}-${
                currentMonth + 1 < 10
                  ? "0" + String(currentMonth + 1)
                  : String(currentMonth + 1)
              }`}
            >
              {getMonthName(currentMonthIndex)}
            </time>
          </h1>
          <div className="flex items-center">
            <button
              className={`bg-indigo-600 rounded-full w-8 h-8 text-2xl mr-2 ${
                selectedDay == null
                  ? "hidden"
                  : plannedMeals[selectedDay!]?.name !== ""
                  ? "hidden"
                  : ""
              }`}
              onClick={openModal}
            >
              {plannedMeals[selectedDay!]?.name == "" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 m-auto text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 m-auto text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              )}
            </button>
            <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
              <button
                type="button"
                className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
                onClick={handlePrevMonth}
              >
                <span className="sr-only">Previous month</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {/* <button
								type="button"
								className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
							>
								Today
							</button> */}
              <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
              <button
                type="button"
                className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
                onClick={handleNextMonth}
              >
                <span className="sr-only">Next month</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="hidden md:ml-4 md:flex md:items-center">
              <div className="relative"></div>
            </div>
          </div>
        </header>
        <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col rounded-t-lg">
          <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none rounded-t-lg">
            <div className="flex justify-center bg-white py-2 rounded-tl-lg">
              <span>S</span>
              <span className="sr-only sm:not-sr-only">un</span>
            </div>
            <div className="flex justify-center bg-white py-2">
              <span>M</span>
              <span className="sr-only sm:not-sr-only">on</span>
            </div>
            <div className="flex justify-center bg-white py-2">
              <span>T</span>
              <span className="sr-only sm:not-sr-only">ue</span>
            </div>
            <div className="flex justify-center bg-white py-2">
              <span>W</span>
              <span className="sr-only sm:not-sr-only">ed</span>
            </div>
            <div className="flex justify-center bg-white py-2">
              <span>T</span>
              <span className="sr-only sm:not-sr-only">hu</span>
            </div>
            <div className="flex justify-center bg-white py-2">
              <span>F</span>
              <span className="sr-only sm:not-sr-only">ri</span>
            </div>
            <div className="flex justify-center bg-white py-2 rounded-tr-lg">
              <span>S</span>
              <span className="sr-only sm:not-sr-only">at</span>
            </div>
          </div>
          <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto rounded-b-lg">
            <div
              className={`hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-${daysInMonth.length} lg:gap-px rounded-b-lg`}
            >
              {daysInMonth.map((week, weekIndex) =>
                week.map((day, dayIndex) => {
                  const isLastWeek = weekIndex === daysInMonth.length - 1;
                  const isFirstDayOfWeek = dayIndex === 0;
                  const isLastDayOfWeek = dayIndex === 6;
                  let classes;
                  if (day == selectedDay) {
                    classes =
                      "relative bg-gray-50 px-3 py-2 text-gray-500 border border-indigo-600";
                  } else {
                    classes = "relative bg-white px-3 py-2 h-32";
                  }
                  if (isLastWeek && isFirstDayOfWeek) {
                    classes += " rounded-bl-lg";
                  } else if (isLastWeek && isLastDayOfWeek) {
                    classes += " rounded-br-lg";
                  }
                  if (isSameDay(currentMonthIndex, Number(day))) {
                    return (
                      <div
                        key={day}
                        className={classes}
                        onClick={() => {
                          if (day === selectedDay) {
                            setSelectedDay(null);
                          } else {
                            setSelectedDay(day);
                          }
                        }}
                      >
                        <time
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
                          dateTime={`${currentYear}-${
                            currentMonthIndex + 1 < 10
                              ? "0" + String(currentMonthIndex + 1)
                              : String(currentMonthIndex + 1)
                          }-${day}`}
                        >
                          {day}
                        </time>
                        {plannedMeals[day].name !== "" ? (
                          <ol className="mt-2">
                            <li>
                              <a href="#" className="group flex">
                                <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                  {plannedMeals[day].name}
                                </p>
                                <input type="checkbox" className="" />
                              </a>
                            </li>
                          </ol>
                        ) : null}
                      </div>
                    );
                  } else if (
                    (weekIndex == 0 && Number(day) > 7) ||
                    ((weekIndex == 4 || weekIndex == 5) && Number(day) <= 7)
                  ) {
                    let classes =
                      "relative bg-gray-100 px-3 py-2 text-gray-500";
                    if (isLastWeek && isFirstDayOfWeek) {
                      classes += " rounded-bl-lg";
                    } else if (isLastWeek && isLastDayOfWeek) {
                      classes += " rounded-br-lg";
                    }
                    return (
                      <div key={day} className={classes}>
                        <time
                          dateTime={`${currentYear}-${
                            currentMonthIndex + 1 < 10
                              ? "0" + String(currentMonthIndex + 1)
                              : String(currentMonthIndex + 1)
                          }-${day}`}
                        >
                          {day}
                        </time>
                      </div>
                    );
                  } else {
                    if (isLastWeek && isFirstDayOfWeek) {
                      classes += " rounded-bl-lg";
                    } else if (isLastWeek && isLastDayOfWeek) {
                      classes += " rounded-br-lg";
                    }
                    return (
                      <div
                        key={day}
                        className={classes}
                        onClick={() => {
                          if (day === selectedDay) {
                            setSelectedDay(null);
                          } else {
                            setSelectedDay(day);
                          }
                        }}
                      >
                        <time
                          dateTime={`${currentYear}-${
                            currentMonthIndex + 1 < 10
                              ? "0" + String(currentMonthIndex + 1)
                              : String(currentMonthIndex + 1)
                          }-${day}`}
                        >
                          {day}
                        </time>
                        {plannedMeals[day].name !== "" ? (
                          <ol className="mt-2">
                            <li>
                              <a href="#" className="group flex">
                                <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                  {plannedMeals[day].name}
                                </p>
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                              </a>
                            </li>
                          </ol>
                        ) : null}
                      </div>
                    );
                  }
                })
              )}
              <div
                className={`absolute bottom-48 mx-auto w-1/3 left-0 right-0 rounded-md bg-red-50 p-4 z-40 ${
                  !showError ? "hidden" : ""
                }`}
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      There was an error with your selection.
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <ul role="list" className="list-disc space-y-1 pl-5">
                        <li>You must select a meal from the list.</li>
                        <li>
                          If you don't see the meal you're planning on having
                          for dinner that day, please navigate to the Saved
                          Meals page and add the new meal with it's ingredients.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`relative z-30 ${
                !showModal ? "hidden" : ""
              } flex items-center justify-center`}
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full justify-center p-4 text-center sm:items-center sm:p-0 mt-12 md:mt-34">
                  <div
                    className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 h-52 md:h-48"
                    ref={modalRef}
                  >
                    <div>
                      <div>
                        <label
                          htmlFor="combobox"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          {selectedDay === null
                            ? "Select a day"
                            : "Planned Meal For " +
                              getMonthName(currentMonthIndex) +
                              " " +
                              selectedDay +
                              nthNumber(Number(selectedDay))}
                        </label>
                        <div className="relative mt-2">
                          <input
                            id="combobox"
                            type="text"
                            value={input}
                            autoFocus
                            onChange={(event) => {
                              setInput(event.target.value);
                            }}
                            onFocus={() => setShowDropdown(true)}
                            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            role="combobox"
                            aria-controls="options"
                            aria-expanded="false"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
                            onClick={() => setShowDropdown(!showDropdown)}
                          >
                            <svg
                              className="h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          <ul
                            className={`absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ${
                              !showDropdown ? "hidden" : ""
                            }`}
                            id="options"
                            role="listbox"
                          >
                            {savedMeals
                              .filter((meal) =>
                                meal.name
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              )
                              .map((meal, idx) => (
                                <li
                                  key={idx}
                                  className="relative select-none py-2 pl-3 pr-9 text-gray-900 cursor-pointer hover:bg-gray-100 sm:text-sm sm:leading-6"
                                  id="option-0"
                                  role="option"
                                  tabIndex={-1}
                                  value={meal.name}
                                  onClick={() => {
                                    setInput(meal.name);
                                    setShowDropdown(false);
                                  }}
                                >
                                  <span className="block truncate">
                                    {meal.name}
                                  </span>
                                  <span
                                    className={`absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 ${
                                      plannedMeals[String(selectedDay)]
                                        ?.name !== meal.name
                                        ? "hidden"
                                        : ""
                                    }`}
                                  >
                                    <svg
                                      className="h-5 w-5"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                </li>
                              ))}

                            {/* More items... */}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                        onClick={(event) => handleSubmit(event, selectedDay!)}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                        onClick={() => {
                          setShowModal(false);
                          setInput("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`isolate grid w-full grid-cols-7 grid-rows-${daysInMonth.length} gap-px lg:hidden`}
            >
              {daysInMonth.map((week, weekIndex) =>
                week.map((day, dayIndex) => {
                  const isLastWeek = weekIndex === daysInMonth.length - 1;
                  const isFirstDayOfWeek = dayIndex === 0;
                  const isLastDayOfWeek = dayIndex === 6;
                  let classes;
                  let timeClasses;
                  // Selected day
                  if (day == selectedDay) {
                    classes =
                      "flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10 bg-white font-semibold text-white";
                    timeClasses =
                      "flex h-6 w-6 ml-auto items-center justify-center rounded-full";
                    // Is selected and and is today
                    if (isSameDay(currentMonthIndex, Number(day))) {
                      timeClasses += " bg-indigo-600";
                      // Is selected and not today
                    } else {
                      timeClasses += " bg-gray-900";
                    }
                    // Not selected day
                  } else {
                    classes =
                      "flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10 bg-white";
                    timeClasses = "ml-auto";
                    if (isSameDay(currentMonthIndex, Number(day))) {
                      classes += " font-semibold text-indigo-600";
                    } else {
                      classes += " text-gray-900";
                    }
                  }
                  // First and last week
                  if (isLastWeek && isFirstDayOfWeek) {
                    classes += " rounded-bl-lg";
                  } else if (isLastWeek && isLastDayOfWeek) {
                    classes += " rounded-br-lg";
                  }
                  // Today
                  if (isSameDay(currentMonthIndex, Number(day))) {
                    classes += " font-semibold text-indigo-600";
                    return (
                      <div
                        key={day}
                        className={classes}
                        onClick={() => {
                          if (day === selectedDay) {
                            setSelectedDay(null);
                          } else {
                            setSelectedDay(day);
                          }
                        }}
                      >
                        <time
                          className={timeClasses}
                          dateTime={`${currentYear}-${
                            currentMonthIndex + 1 < 10
                              ? "0" + String(currentMonthIndex + 1)
                              : String(currentMonthIndex + 1)
                          }-${day}`}
                        >
                          {day}
                        </time>
                        {plannedMeals[day].name !== "" ? (
                          <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                            <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                          </span>
                        ) : null}
                      </div>
                    );
                    // Days outside of current month
                  } else if (
                    (weekIndex == 0 && Number(day) > 7) ||
                    ((weekIndex == 4 || weekIndex == 5) && Number(day) <= 7)
                  ) {
                    let classes =
                      "flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10 bg-gray-50 text-gray-500";
                    if (isLastWeek && isFirstDayOfWeek) {
                      classes += " rounded-bl-lg";
                    } else if (isLastWeek && isLastDayOfWeek) {
                      classes += " rounded-br-lg";
                    }
                    return (
                      <div key={day} className={classes}>
                        <time
                          className="ml-auto"
                          dateTime={`${currentYear}-${
                            currentMonthIndex + 1 < 10
                              ? "0" + String(currentMonthIndex + 1)
                              : String(currentMonthIndex + 1)
                          }-${day}`}
                        >
                          {day}
                        </time>
                        {plannedMeals[day].name !== "" ? (
                          <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                            <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                          </span>
                        ) : null}
                      </div>
                    );
                    // Days in current month
                  } else {
                    if (isLastWeek && isFirstDayOfWeek) {
                      classes += " rounded-bl-lg";
                    } else if (isLastWeek && isLastDayOfWeek) {
                      classes += " rounded-br-lg";
                    }
                    return (
                      <div
                        key={day}
                        className={classes}
                        onClick={() => {
                          if (day === selectedDay) {
                            setSelectedDay(null);
                          } else {
                            setSelectedDay(day);
                          }
                        }}
                      >
                        <time
                          className={timeClasses}
                          dateTime={`${currentYear}-${
                            currentMonthIndex + 1 < 10
                              ? "0" + String(currentMonthIndex + 1)
                              : String(currentMonthIndex + 1)
                          }-${day}`}
                        >
                          {day}
                        </time>
                        {plannedMeals[day].name !== "" ? (
                          <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                            <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                          </span>
                        ) : null}
                      </div>
                    );
                  }
                })
              )}
            </div>
          </div>
        </div>
        <div className="px-4 py-10 sm:px-6 lg:hidden">
          <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
            {selectedDay && plannedMeals[selectedDay].name !== "" ? (
              <li className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
                <div className="flex-auto flex items-center">
                  <p className="font-semibold text-gray-900">
                    {plannedMeals[selectedDay].name}
                  </p>
                </div>
                <input type="checkbox" className="my-auto mr-2"></input>
                <button
                  className="flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 opacity-100"
                  onClick={openModal}
                >
                  Edit
                  <span className="sr-only">
                    , {plannedMeals[selectedDay].name}
                  </span>
                </button>
              </li>
            ) : null}
          </ol>
        </div>
      </div>
    </>
  );
}
