import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      return getHousehold(req, res, Number(id));
    case "PUT":
      return updateHousehold(req, res, Number(id));
    case "DELETE":
      return deleteHousehold(req, res, Number(id));
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

async function getHousehold(
  req: NextApiRequest,
  res: NextApiResponse,
  id: number
) {
  try {
    const household = await prisma.household.findUnique({ where: { id } });
    if (household) {
      res.status(200).json(household);
    } else {
      res.status(404).json({ message: "Household not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching household", error });
  }
}

async function updateHousehold(
  req: NextApiRequest,
  res: NextApiResponse,
  id: number
) {
  try {
    const { name, savedMealId, ingredientId, plannedMealId, shoppingListId } =
      req.body;
    const household = await prisma.household.update({
      where: { id },
      data: { name, savedMealId, ingredientId, plannedMealId, shoppingListId },
    });
    res.status(200).json(household);
  } catch (error) {
    res.status(400).json({ message: "Error updating household", error });
  }
}

async function deleteHousehold(
  req: NextApiRequest,
  res: NextApiResponse,
  id: number
) {
  try {
    await prisma.household.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: "Error deleting household", error });
  }
}
