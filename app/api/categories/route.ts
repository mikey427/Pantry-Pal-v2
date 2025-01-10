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
    const categories = await db.category.findMany({
      where: {
        householdId: householdId,
      },
      include: {
        ingredients: true, // This will fetch ingredients for each category
      },
    });
    if (categories == null || categories == undefined) {
      return NextResponse.json(
        {
          error: "No categories found for this household",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(categories);
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

  if (!requestBody || !requestBody.name) {
    return NextResponse.json(
      { error: "Invalid request body. 'newCategory' and 'name' are required." },
      { status: 400 }
    );
  }
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
    const newCategory = await db.category.create({
      data: {
        householdId: householdId,
        name: requestBody.name,
        ingredients: {
          connect: [], // Explicitly pass an empty connect array
        },
      },
    });
    newCategory.ingredients = [];
    return NextResponse.json(newCategory);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong fetching the data." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  // const householdId = Number(searchParams.get("householdId"));
  // const categoryId = searchParams.get("categoryId");
  const editType = searchParams.get("editType");
  const requestBody = await request.json();
  console.log(requestBody);
  // const householdId = requestBody.householdId;

  // if (!requestBody.householdId) {
  //   return NextResponse.json(
  //     {
  //       error: "Household ID is required.",
  //     },
  //     {
  //       status: 400,
  //     }
  //   );
  // } else if (isNaN(Number(requestBody.householdId))) {
  //   return NextResponse.json(
  //     { error: "Household ID must be a valid number" },
  //     { status: 400 }
  //   );
  // }
  if (!requestBody) {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  try {
    if (editType === "name") {
      const category = await db.category.update({
        where: {
          id: Number(requestBody.categoryId),
        },
        data: {
          name: requestBody.name,
        },
      });
      return NextResponse.json(category);
    } else if (editType === "ingredients") {
      // const [delFromCategory, addToCategory] = await db.$transaction([
      // db.category.update({
      //   where: {
      //     id: Number(requestBody.categoryId),
      //   },
      //   data: {
      //     ingredients: requestBody.ingredients,
      //   },
      // }),
      // db.category.update({
      //   where: {
      //     id: Number(requestBody.newCategoryId),
      //   },
      //   data: {
      //     ingredients: requestBody.ingredients,
      //   },
      // }),
      // ]);

      // May not need
      const updatedIngredient = await db.ingredient.update({
        where: {
          id: Number(requestBody.foodId),
        },
        data: {
          categoryId: requestBody.newCategoryId,
        },
      });
      console.log(updatedIngredient);
      // console.log(addToCategory);
      return NextResponse.json({
        updatedIngredient,
      });
    } else {
      return NextResponse.json({ error: "Invalid edit type" }, { status: 400 });
    }
  } catch (error) {
    console.error("Update operation failed:", error);

    if (editType === "name") {
      return NextResponse.json(
        { error: "Failed to update the category name." },
        { status: 500 }
      );
    } else if (editType === "ingredients") {
      return NextResponse.json(
        { error: "Failed to move ingredients between categories." },
        { status: 500 }
      );
    }
  }
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const categoryId = searchParams.get("categoryId");

  if (!categoryId) {
    return NextResponse.json(
      {
        error: "Category ID is required.",
      },
      {
        status: 400,
      }
    );
  } else if (isNaN(Number(categoryId))) {
    return NextResponse.json(
      { error: "Category ID must be a valid number" },
      { status: 400 }
    );
  }

  try {
    const [deletedCategory, updatedCategories] = await db.$transaction([
      db.category.delete({
        where: {
          id: Number(categoryId),
        },
      }),
      db.category.findMany({
        where: {
          householdId: (
            await db.category.findUnique({
              where: { id: Number(categoryId) },
              select: { householdId: true },
            })
          )?.householdId,
        },
        orderBy: {
          name: "asc",
        },
        include: {
          ingredients: true,
        },
      }),
    ]);
    return NextResponse.json(updatedCategories);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong fetching the data." },
      { status: 500 }
    );
  }
}
