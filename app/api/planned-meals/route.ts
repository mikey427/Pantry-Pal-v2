import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/db";
import { calendarData as plannedMealStarterObject } from "@/lib/utils";
import { startingPlannedMeals } from "@/@types/types";
import { getMonthName } from "@/lib/utils";
import { calendarData } from "@/lib/utils";

export interface NextPageProps<SlugType = string> {
  params: { slug: SlugType };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const householdId = Number(searchParams.get("householdId"));
  const monthYear = searchParams.get("month");
  const month = monthYear?.split("_")[0];
  const year = Number(monthYear?.split("_")[1]);
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
    // console.log("month", month);
    // console.log("year", year);
    // console.log("Hit here in API");

    const plannedMealData = await db.plannedMeal.findFirst({
      where: {
        householdId: householdId,
        month: getMonthName(Number(month)),
        year: year,
      },
    });

    if (plannedMealData == null || plannedMealData == undefined) {
      const currDate = new Date();
      if (month) {
        const newHouseholdPlannedMeals = await db.plannedMeal.create({
          data: {
            householdId: householdId,
            data: plannedMealStarterObject,
            month: getMonthName(Number(month)),
            year: year,
          },
        });
        return NextResponse.json(newHouseholdPlannedMeals);
      }
      // if (plannedMealData.length == 0) {
      //   return NextResponse.json(
      //     { error: "Planned Meal data not found" },
      //     { status: 404 }
      //   );
    }
    return NextResponse.json(plannedMealData);
  } catch (error) {
    console.error("Error fetching planned meal data: ", error);
    return NextResponse.json(
      { error: "Something went wrong fetching the data." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const householdId = Number(searchParams.get("householdId"));
    const monthYear = searchParams.get("month");
    const monthNum = Number(monthYear?.split("_")[0]) - 1;

    const year = Number(monthYear?.split("_")[1]);
    const res = await request.json();
    // console.log(res);
    console.log("res", res);
    console.log("householdId", householdId);
    console.log("monthNum", monthNum);
    console.log("getMonthName(month", getMonthName(monthNum));
    console.log("year", year);

    const plannedMealData = await db.plannedMeal.findFirst({
      where: {
        householdId: householdId,
        month: getMonthName(monthNum),
        year: year,
      },
    });

    const savedMeal = await db.savedMeal.findFirst({
      where: {
        householdId: householdId,
        name: res.name,
      },
    });
    // not done, need to fix and return correct data
    return NextResponse.json(savedMeal);
  } catch (error) {
    console.error("Error fetching planned meal data: ", error);
    return NextResponse.json(
      { error: "Something went wrong fetching the data." },
      { status: 500 }
    );
  }
}
