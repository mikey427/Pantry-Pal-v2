import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/db";
import { validateHouseholdId } from "@/lib/validation";

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
    const shoppingList = await db.shoppingList.findMany({
      where: {
        householdId: householdId,
      },
    });
    if (shoppingList == null || shoppingList == undefined) {
      return NextResponse.json(
        {
          error: "No shopping list found for this household",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(shoppingList);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong fetching the data." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const householdId = Number(requestBody.householdId);

  // if (!householdId) {
  //   return NextResponse.json(
  //     {
  //       error: "Household ID is required.",
  //     },
  //     {
  //       status: 400,
  //     }
  //   );
  // } else if (isNaN(Number(householdId))) {
  //   return NextResponse.json(
  //     { error: "Household ID must be a valid number" },
  //     { status: 400 }
  //   );
  // }
  if (validateHouseholdId(householdId)) {
    try {
      // console.log(requestBody);
      if (!requestBody.newItem?.name || !requestBody.newItem?.quantity) {
        return NextResponse.json(
          { error: "Name and quantity are required" },
          { status: 400 }
        );
      }
      const newListItem = await db.shoppingList.create({
        data: {
          householdId: householdId,
          name: requestBody.newItem.name,
          quantity: requestBody.newItem.quantity,
        },
      });
      // console.log(newListItem);
      const shoppingList = await db.shoppingList.findMany({
        where: {
          householdId: householdId,
        },
      });
      // console.log(shoppingList);
      return NextResponse.json(shoppingList);
    } catch (error) {
      return NextResponse.json(
        { error: "Something went wrong fetching the data." },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { error: "Household ID not valid." },
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const requestBody = await request.json();
  const householdId = Number(requestBody.householdId);
  console.log(requestBody);

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
    const updatedShoppingList = await db.shoppingList.update({
      where: {
        householdId: householdId,
      },
      data: {
        data: requestBody.data,
      },
    });
    return NextResponse.json(updatedShoppingList);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong fetching the data." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const delItemId = Number(searchParams.get("id"));
  const householdId = Number(searchParams.get("householdId"));
  const fullClear: boolean = Boolean(searchParams.get("clear"));

  try {
    if (!validateHouseholdId(householdId)) {
      throw new Error("Invalid Household ID");
    }
    if (fullClear) {
      const deletedItems = await db.shoppingList.deleteMany({
        where: {
          householdId: householdId,
        },
      });
      return NextResponse.json(deletedItems);
    } else {
      if (delItemId) {
        const deletedItem = await db.shoppingList.delete({
          where: {
            id: Number(delItemId),
          },
        });
        return NextResponse.json(deletedItem);
      } else {
        throw new Error("No Item ID found.");
      }
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
