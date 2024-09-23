import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getIngredients(req, res);
    case "POST":
      return createIngredient(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

async function getIngredients(req: NextApiRequest, res: NextApiResponse) {
  try {
    const ingredients = await prisma.ingredient.findMany();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ingredients", error });
  }
}

async function createIngredient(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, description, householdId } = req.body;
    const ingredient = await prisma.ingredient.create({
      data: { name, description, householdId },
    });
    res.status(201).json(ingredient);
  } catch (error) {
    res.status(400).json({ message: "Error creating ingredient", error });
  }
}
