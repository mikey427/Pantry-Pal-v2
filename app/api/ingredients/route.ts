import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/db";

export interface NextPageProps<SlugType = string> {
  params: { slug: SlugType };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const householdId = Number(searchParams.get("householdId"));

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
    const ingredients = await db.ingredient.findMany({
      where: {
        householdId: householdId,
      },
    });
    if (ingredients == null || ingredients == undefined) {
      return NextResponse.json(
        { error: "No ingredients found for this household" },
        { status: 404 }
      );
    }
    return NextResponse.json(ingredients);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong fetching the data." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const householdId = Number(searchParams.get("householdId"));
  const requestBody = await request.json();

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
    console.log("requestBody.categoryId", requestBody.categoryId);
    const categoryExists = await db.category.findUnique({
      where: { id: requestBody.categoryId },
    });
    if (!categoryExists) {
      return NextResponse.json(
        { error: `Category with ID ${requestBody.categoryId} does not exist` },
        { status: 400 }
      );
    }
    const newIngredient = await db.ingredient.create({
      data: {
        name: requestBody.name,
        householdId: householdId,
        categoryId: Number(requestBody.categoryId),
        quantity: 1,
      },
    });
    return NextResponse.json(newIngredient);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong creating the ingredient." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const householdId = Number(searchParams.get("householdId"));
  const requestBody = await request.json();

  if (!requestBody) {
    return NextResponse.json(
      { error: "Request Body is required to update an ingredient" },
      { status: 400 }
    );
  }
  console.log("requestBody", requestBody);

  try {
    const updatedIngredient = await db.ingredient.update({
      where: {
        id: requestBody.id,
      },
      data: {
        name: requestBody.name,
        quantity: requestBody.quantity,
        categoryId: requestBody.categoryId,
      },
    });
    return NextResponse.json(updatedIngredient);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong updating the ingredient. " + error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const requestBody = await request.json();
  const ingredientId = requestBody.id;

  if (!ingredientId) {
    return NextResponse.json(
      {
        error: "Ingredient ID is required.",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const deletedIngredient = await db.ingredient.delete({
      where: {
        id: Number(ingredientId),
      },
    });
    return NextResponse.json(deletedIngredient, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong deleting the ingredient." },
      { status: 500 }
    );
  }
}
