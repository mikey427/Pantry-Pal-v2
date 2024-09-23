import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      return getIngredient(req, res, Number(id));
    case "PUT":
      return updateIngredient(req, res, Number(id));
    case "DELETE":
      return deleteIngredient(req, res, Number(id));
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

async function getIngredient(
  req: NextApiRequest,
  res: NextApiResponse,
  id: number
) {
  try {
    const ingredient = await prisma.ingredient.findUnique({ where: { id } });
    if (ingredient) {
      res.status(200).json(ingredient);
    } else {
      res.status(404).json({ message: "Ingredient not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching ingredient", error });
  }
}

async function updateIngredient(
  req: NextApiRequest,
  res: NextApiResponse,
  id: number
) {
  try {
    const { name, description, householdId } = req.body;
    const ingredient = await prisma.ingredient.update({
      where: { id },
      data: { name, description, householdId },
    });
    res.status(200).json(ingredient);
  } catch (error) {
    res.status(400).json({ message: "Error updating ingredient", error });
  }
}

async function deleteIngredient(
  req: NextApiRequest,
  res: NextApiResponse,
  id: number
) {
  try {
    await prisma.ingredient.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: "Error deleting ingredient", error });
  }
}
