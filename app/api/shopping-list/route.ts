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
    const shoppingList = await db.shoppingList.findFirst({
      where: {
        householdId: householdId,
      },
    });
    if (shoppingList == null || shoppingList == undefined) {
      return NextResponse.json(
        {
          error: "No shoppoing list found for this household",
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
