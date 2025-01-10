"use client";
import React, { useState, useEffect } from "react";
import { retrieveLocalData, updateLocalData } from "../../lib/utils";
import { Meal } from "../../@types/types";
import PageHeader from "../../Components/PageHeader";
import Button from "../../Components/Button";
import { useSession } from "next-auth/react";

// interface Meal {
//     id: string;
//     name: string;
//     ingredients: string[];
// }

type Props = {};

export default function SavedMealsPage({}: Props) {
  const session = useSession();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<Meal | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [mealNameInput, setMealNameInput] = useState("");
  const [selectedIngredientIndex, setSelectedIngredientIndex] = useState<
    number | null
  >(null);
  const [editing, setEditing] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // list or grid
  const [status, setStatus] = useState<string | null>(session.status);
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    window.location.origin ||
    "localhost:3000";

  // useEffect(() => {
  //   const savedMeals = retrieveLocalData("savedMeals") || [];
  //   setMeals(savedMeals);
  // }, []);

  // useEffect(() => {
  //   console.log("session", session);
  //   const retrieveData = async () => {
  //     if (status != "authenticated") return;
  //     // console.log("reached api call");
  //     const response = await fetch(
  //       `${baseUrl}/api/saved-meals?householdId=${session?.data?.user?.householdId}`
  //     );
  //     const data = await response.json();
  //     setMeals(data);
  //   };
  //   retrieveData();
  // }, [status]);
  useEffect(() => {
    const retrieveData = async () => {
      if (
        session.status === "authenticated" &&
        session.data?.user?.householdId
      ) {
        try {
          const response = await fetch(
            `${baseUrl}/api/saved-meals?householdId=${session.data.user.householdId}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch saved meals");
          }

          const data = await response.json();
          console.log("data", data);
          setMeals(data);
        } catch (error) {
          console.error("Error fetching saved meals:", error);
        }
      }
    };

    retrieveData();
  }, [session.status, session.data]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredMeals = meals.filter((meal) =>
    meal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (meal: Meal | null = null) => {
    setMealNameInput(meal?.name || "");
    setIngredients(meal?.ingredients || []);
    setModalOpen(true);
    if (meal) {
      setEditing(true);
    }
    console.log("meal in openModal", meal);
    setModalData(meal);
  };

  const closeModal = () => {
    setMealNameInput("");
    setIngredientInput("");
    setIngredients([]);
    setModalOpen(false);
    setModalData(null);
    setEditing(false);
  };

  // const addMeal = (newMeal: Meal) => {
  //   setMeals((prevMeals) => [...prevMeals, newMeal]);
  //   console.log(newMeal);
  //   updateLocalData("savedMeals", [...meals, newMeal]);
  //   setIngredientInput("");
  //   setMealNameInput("");
  //   closeModal();
  // };

  const addMeal = async (newMeal: Meal) => {
    event?.preventDefault();
    setMeals((prevMeals) => [...prevMeals, newMeal]);
    console.log(newMeal);
    console.log("in addMeal");
    const response = await fetch(
      `${baseUrl}/api/saved-meals?householdId=${session?.data?.user?.householdId}&mealName=${newMeal.name}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: newMeal.ingredients }),
      }
    );
    // console.log(response);
    // updateLocalData("savedMeals", [...meals, newMeal]);
    const data = await response.json();
    console.log(data);
    setMeals([...meals, newMeal]);
    setIngredientInput("");
    setMealNameInput("");
    closeModal();
  };

  const editMeal = async (editedMeal: Meal) => {
    // const updatedMeals = meals.map((meal) =>
    //   meal.id === editedMeal.id ? editedMeal : meal
    // );
    // setMeals(updatedMeals);
    // updateLocalData("savedMeals", updatedMeals);
    console.log(editedMeal);
    const response = await fetch(`${baseUrl}/api/saved-meals`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedMeal),
    });
    // console.log(response);
    // May need to update this later, this may not be best practice way of updating initial meals
    const updatedMeals = meals.map((meal) =>
      meal.id === editedMeal.id ? editedMeal : meal
    );
    setMeals(updatedMeals);
    closeModal();
  };

  const deleteMeal = async (id: string) => {
    const response = await fetch(`${baseUrl}/api/saved-meals`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    const updatedMeals = meals.filter((meal) => meal.id !== id);
    setMeals(updatedMeals);
    updateLocalData("savedMeals", updatedMeals);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "list" ? "grid" : "list");
  };

  // TODO: Correct this function
  const addOrEditMeal = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("ingredients", ingredients);
    modalData?.ingredients
      ? await editMeal({
          id: modalData.id,
          name: mealNameInput,
          ingredients: ingredients,
        })
      : await addMeal({
          id: String(meals.length + 1),
          name: mealNameInput,
          ingredients: ingredients,
        });
    // await addMeal({
    //   id: String(meals.length + 1),
    //   name: mealNameInput,
    //   ingredients: ingredients,
    // });
    setIngredients([]);
    setIngredientInput("");
    setMealNameInput("");
  };

  return (
    <div className="container bg-primary w-screen h-screen mx-auto px-4 py-8 text-gray-700">
      <PageHeader
        title="Saved Meals"
        description="This is where you can view, edit, and delete your saved meals which can be scheduled as a meal on the Meal Planner."
      />
      <div className="mb-4 flex justify-between w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search meals"
          className="input input-bordered w-full max-w-xs rounded-md"
        />

        <Button
          callback={toggleViewMode}
          styles="btn text-white ml-1 hidden md:block"
          text={`View Mode: ${
            viewMode.charAt(0).toUpperCase() + viewMode.slice(1)
          }`}
        />
      </div>
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMeals.map((meal) => (
            <div
              key={meal.id + 1}
              className="bg-primaryLight shadow-md rounded-md p-4 text-white"
            >
              <h2 className="text-xl font-bold mb-2">{meal.name}</h2>

              <Button
                callback={() => openModal(meal)}
                styles="text-white mr-2 border-0"
                text="View/Edit"
              />
              <Button
                callback={() => deleteMeal(meal.id)}
                styles={"text-white border-0"}
                text="Delete"
              />
            </div>
          ))}
        </div>
      ) : (
        <div>
          {filteredMeals.map((meal) => (
            <div
              key={meal.id + 1}
              className="bg-primaryLight text-white shadow-md rounded-md p-2 flex items-center justify-between mb-2"
            >
              <h2 className="text-xl font-bold">{meal.name}</h2>
              <div className="flex items-center my-auto">
                <Button
                  callback={() => openModal(meal)}
                  styles="text-white mr-2 border-0 "
                  text="View/Edit"
                />
                <Button
                  callback={() => deleteMeal(meal.id)}
                  styles={"text-white border-0"}
                  text="Delete"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div
          className="relative z-10 flex items-center justify-center"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <form>
                  <div className="flex flex-col mb-4">
                    <label className="mb-1">Meal Name</label>
                    <input
                      className="rounded input-bordered w-full max-w-xs"
                      value={mealNameInput}
                      onChange={(event) => setMealNameInput(event.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mb-4">
                    <label className="mb-1">Ingredients:</label>
                    {ingredients.length === 0 ? (
                      <p className="text-gray-400">No ingredients added yet.</p>
                    ) : (
                      <ul className="p-2 max-h-64 overflow-scroll">
                        {ingredients.map((ingredient: string, idx: number) => (
                          <li
                            key={idx}
                            className="flex justify-between items-center"
                          >
                            <span>{ingredient}</span>
                            <div>
                              <button
                                type="button"
                                className="btn text-blue-500 mr-2"
                                onClick={() => {
                                  setIngredientInput(ingredient);
                                  setSelectedIngredientIndex(idx);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="btn text-red-500"
                                onClick={() => {
                                  const updatedIngredients = [...ingredients];
                                  updatedIngredients.splice(idx, 1);
                                  setIngredients(updatedIngredients);
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex mt-2">
                      <input
                        className="rounded input-bordered w-full max-w-xs p-2 flex-1 mr-2"
                        value={ingredientInput}
                        onChange={(event) =>
                          setIngredientInput(event.target.value)
                        }
                      />
                      <Button
                        text={`${
                          selectedIngredientIndex !== null
                            ? "Edit Ingredient"
                            : "Add Ingredient"
                        }`}
                        styles="btn text-sm h-8 bg-accent text-white border-0"
                        callback={() => {
                          if (modalData?.ingredients) {
                            console.log("modalData", modalData);
                            let temp: Meal = modalData;
                            // Editing existing ingredient

                            if (selectedIngredientIndex !== null) {
                              temp.ingredients[selectedIngredientIndex] =
                                ingredientInput;
                              setModalData({ ...temp });
                            } else {
                              console.log("Adding new ingredient");
                              console.log("temp", temp);
                              temp.ingredients.push(ingredientInput);
                              setModalData({ ...temp });
                            }
                          } else {
                            // For new meals
                            setIngredients([...ingredients, ingredientInput]);
                          }
                          setIngredientInput("");
                          setSelectedIngredientIndex(null); // Reset selected index
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      callback={async (event) => {
                        await addOrEditMeal(event);
                      }}
                      isSubmit={true}
                      styles="mr-2 bg-green-500 text-white border-0"
                      text={modalData ? "Save Meal" : "Add Meal"}
                    />
                    <Button
                      callback={closeModal}
                      styles="bg-red-500 text-white border-0"
                      text="Cancel"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <Button
        callback={openModal}
        styles="btn fixed bottom-4 right-4 text-white"
        text="Add Meal"
      />
    </div>
  );
}
