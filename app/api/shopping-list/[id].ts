import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      return getShoppingListItem(req, res, Number(id));
    case "PUT":
      return updateShoppingListItem(req, res, Number(id));
    case "DELETE":
      return deleteShoppingListItem(req, res, Number(id));
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

async function getShoppingListItem(
  req: NextApiRequest,
  res: NextApiResponse,
  id: number
) {
  try {
    const shoppingListItem = await prisma.shoppingList.findUnique({
      where: { id },
    });
    if (shoppingListItem) {
      res.status(200).json(shoppingListItem);
    } else {
      res.status(404).json({ message: "Shopping list item not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching shopping list item", error });
  }
}

async function updateShoppingListItem(
  req: NextApiRequest,
  res: NextApiResponse,
  id: number
) {
  try {
    const { itemName, quantity, unit, purchased, userId, householdId } =
      req.body;
    const shoppingListItem = await prisma.shoppingList.update({
      where: { id },
      data: { itemName, quantity, unit, purchased, userId, householdId },
    });
    res.status(200).json(shoppingListItem);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating shopping list item", error });
  }
}

async function deleteShoppingListItem(
  req: NextApiRequest,
  res: NextApiResponse,
  id: number
) {
  try {
    await prisma.shoppingList.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting shopping list item", error });
  }
}
