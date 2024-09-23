import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      return getPlannedMeal(req, res, Number(id));
    case "PUT":
      return updatePlannedMeal(req, res, Number(id));
    case "DELETE":
      return deletePlannedMeal(req, res, Number(id));
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

async function getPlannedMeal(
  req: NextApiRequest,
  res: NextApiResponse,
  id: number
) {
  try {
    const plannedMeal = await prisma.plannedMeal.findUnique({ where: { id } });
    if (plannedMeal) {
      res.status(200).json(plannedMeal);
    } else {
      res.status(404).json({ message: "Planned meal not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching planned meal", error });
  }
}

async function updatePlannedMeal(
  req: NextApiRequest,
  res: NextApiResponse,
  id: number
) {
  try {
    const { householdId, data } = req.body;
    const plannedMeal = await prisma.plannedMeal.update({
      where: { id },
      data: { householdId, data },
    });
    res.status(200).json(plannedMeal);
  } catch (error) {
    res.status(400).json({ message: "Error updating planned meal", error });
  }
}

async function deletePlannedMeal(
  req: NextApiRequest,
  res: NextApiResponse,
  id: number
) {
  try {
    await prisma.plannedMeal.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: "Error deleting planned meal", error });
  }
}
