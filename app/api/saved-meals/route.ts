import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/db";

export interface NextPageProps<SlugType = string> {
  params: { slug: SlugType };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// GET /api/saved-meals?householdId=1
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const householdId = Number(searchParams.get("householdId"));
  const mealName = searchParams.get("name");
  console.log(householdId);
  if (!householdId) {
    return NextResponse.json(
      {
        error: "Household ID is required.",
      },
      {
        status: 400,
      }
    );
  } else if (isNaN(Number(householdId))) {
    return NextResponse.json(
      { error: "Household ID must be a valid number" },
      { status: 400 }
    );
  }
  try {
    // need to finish these routes to be used for calendar
    const savedMeals = await db.savedMeal.findMany({
      where: {
        householdId: householdId,
      },
    });
    if (savedMeals == null || savedMeals == undefined) {
      return NextResponse.json(
        { error: "No saved meals found for this household" },
        { status: 404 }
      );
    }

    return NextResponse.json(savedMeals);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong fetching the data." },
      { status: 500 }
    );
  }
}

// POST /api/saved-meals?householdId=1&mealName="test"
export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const householdId = Number(searchParams.get("householdId"));
  const mealName = searchParams.get("mealName");
  const requestBody = await request.json();
  const ingredients = requestBody.ingredients;
  console.log("mealName", mealName);

  if (!householdId) {
    return NextResponse.json(
      {
        error: "Household ID is required.",
      },
      {
        status: 400,
      }
    );
  } else if (isNaN(Number(householdId))) {
    return NextResponse.json(
      { error: "Household ID must be a valid number" },
      { status: 400 }
    );
  }
  try {
    if (!mealName) {
      return NextResponse.json(
        { error: "Saved meal not found" },
        { status: 404 }
      );
    }
    const newSavedMeal = await db.savedMeal.create({
      data: {
        householdId: householdId,
        name: mealName.toLowerCase(),
        ingredients: ingredients, // PLACE HOLDER UPDATE TO INGREDIENTS
      },
    });
    console.log("newSavedMeal", newSavedMeal);
    // const newSavedMeals = await db.savedMeal.findMany({
    //   where: {
    //     householdId: householdId,
    //   },
    // });
    // console.log("newSavedMeals", newSavedMeals);
    if (newSavedMeal == null || newSavedMeal == undefined) {
      return NextResponse.json(
        { error: "Failed to save meal" },
        { status: 500 }
      );
    }
    return NextResponse.json(newSavedMeal);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong fetching the data." },
      { status: 500 }
    );
  }
}

// PUT /api/saved-meals?mealId=x
export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const requestBody = await request.json();
    // const householdId = Number(searchParams.get("householdId"));
    const mealId = Number(requestBody.id);

    const existingMeal = await db.savedMeal.findUnique({
      where: {
        id: mealId,
        // householdId: householdId,
      },
    });

    if (!existingMeal) {
      return NextResponse.json({ error: "Meal not found" }, { status: 404 });
    }

    const updatedMeal = await db.savedMeal.update({
      where: {
        id: mealId,
      },
      data: {
        name: requestBody.name,
        ingredients: requestBody.ingredients,
      },
    });

    return NextResponse.json(updatedMeal);
  } catch (error) {
    console.error("Update meal error:", error);
    return NextResponse.json(
      { error: "Failed to update meal" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const mealId = requestBody.id;

    const deleteMeal = await db.savedMeal.delete({
      where: {
        id: mealId,
      },
    });

    return NextResponse.json(deleteMeal);
  } catch (error) {
    console.error("Delete meal error:", error);
    return NextResponse.json(
      { error: "Failed to delete meal" },
      { status: 500 }
    );
  }
}
