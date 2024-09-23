import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getHouseholds(req, res);
    case "POST":
      return createHousehold(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

async function getHouseholds(req: NextApiRequest, res: NextApiResponse) {
  try {
    const households = await prisma.household.findMany();
    res.status(200).json(households);
  } catch (error) {
    res.status(500).json({ message: "Error fetching households", error });
  }
}

async function createHousehold(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, savedMealId, ingredientId, plannedMealId, shoppingListId } =
      req.body;
    const household = await prisma.household.create({
      data: { name, savedMealId, ingredientId, plannedMealId, shoppingListId },
    });
    res.status(201).json(household);
  } catch (error) {
    res.status(400).json({ message: "Error creating household", error });
  }
}
