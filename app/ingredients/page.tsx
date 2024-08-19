"use client";
import React, { useState } from "react";
import IngredientAccordion from "../../Components/IngredientAccordion";
import PageHeader from "../../Components/PageHeader";

type Props = {};

interface IngredientsData {
  [key: string]: string[];
}

export default function page({}: Props) {
  // const [ingredientCategories, setIngredientCategories] = useState<IngredientsData>({
  //     "proteins": [],
  //     "vegetables": [],
  //     "grains and Starches": [],
  //     "sauces, condiments and seasonings": [],
  //     "dairy": [],
  //     "fruits": []
  // });
  const desc =
    "This is where you will track all of the ingredients you currently have in the house. Categorize them the way that makes sense to you.";

  return (
    <div className="w-3/4 flex flex-col mx-auto">
      {/* <h1 className='mt-8 mb-4 w-max text-2xl font-bold'>Ingredients</h1> */}
      <PageHeader title="Ingredients" description={desc} />
      <IngredientAccordion />
      {/* <NewIngredientAccordion /> */}
    </div>
  );
}
