import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getShoppingLists(req, res);
    case "POST":
      return createShoppingList(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

async function getShoppingLists(req: NextApiRequest, res: NextApiResponse) {
  try {
    const shoppingLists = await prisma.shoppingList.findMany();
    res.status(200).json(shoppingLists);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shopping lists", error });
  }
}

async function createShoppingList(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { itemName, quantity, unit, purchased, userId, householdId } =
      req.body;
    const shoppingList = await prisma.shoppingList.create({
      data: { itemName, quantity, unit, purchased, userId, householdId },
    });
    res.status(201).json(shoppingList);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating shopping list item", error });
  }
}
