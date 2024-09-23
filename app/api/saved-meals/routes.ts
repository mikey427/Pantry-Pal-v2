import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getSavedMeals(req, res);
    case "POST":
      return createSavedMeal(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

async function getSavedMeals(req: NextApiRequest, res: NextApiResponse) {
  try {
    const savedMeals = await prisma.savedMeal.findMany();
    res.status(200).json(savedMeals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching saved meals", error });
  }
}

async function createSavedMeal(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, data, householdId } = req.body;
    const savedMeal = await prisma.savedMeal.create({
      data: { name, data, householdId },
    });
    res.status(201).json(savedMeal);
  } catch (error) {
    res.status(400).json({ message: "Error creating saved meal", error });
  }
}
