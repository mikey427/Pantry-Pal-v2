import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      return getSavedMeal(req, res, Number(id));
    case "PUT":
      return updateSavedMeal(req, res, Number(id));
    case "DELETE":
      return deleteSavedMeal(req, res, Number(id));
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

async function getSavedMeal(
  req: NextApiRequest,
  res: NextApiResponse,
  id: number
) {
  try {
    const savedMeal = await prisma.savedMeal.findUnique({ where: { id } });
    if (savedMeal) {
      res.status(200).json(savedMeal);
    } else {
      res.status(404).json({ message: "Saved meal not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching saved meal", error });
  }
}

async function updateSavedMeal(
  req: NextApiRequest,
  res: NextApiResponse,
  id: number
) {
  try {
    const { name, data, householdId } = req.body;
    const savedMeal = await prisma.savedMeal.update({
      where: { id },
      data: { name, data, householdId },
    });
    res.status(200).json(savedMeal);
  } catch (error) {
    res.status(400).json({ message: "Error updating saved meal", error });
  }
}

async function deleteSavedMeal(
  req: NextApiRequest,
  res: NextApiResponse,
  id: number
) {
  try {
    await prisma.savedMeal.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: "Error deleting saved meal", error });
  }
}
