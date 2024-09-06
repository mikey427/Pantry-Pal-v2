import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";
import { types } from "util";
import { startingPlannedMeals } from "@/lib/types";

// model PlannedMeal {
//   id          Int        @id @default(autoincrement())
//   householdId Int        @unique
//   data        Json // This will store the entire meal plan as a Json object
//   createdAt   DateTime   @default(now())
//   updatedAt   DateTime   @updatedAt
//   household   Household?
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { householdId } = req.query;
    const plannedMeals = await prisma.plannedMeal.findFirst({
      where: {
        householdId: Number(householdId),
      },
    });
    res.status(200).json(plannedMeals);
  } else if (req.method === "POST") {
    const { data, householdId } = req.body;
    const newPlannedMeal = await prisma.plannedMeal.create({
      data: {
        data: startingPlannedMeals,
        householdId,
      },
    });

    res.status(201).json(newPlannedMeal);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
