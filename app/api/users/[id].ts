// pages/api/users/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      return getUser(req, res, Number(id));
    case "PUT":
      return updateUser(req, res, Number(id));
    case "DELETE":
      return deleteUser(req, res, Number(id));
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

async function getUser(req: NextApiRequest, res: NextApiResponse, id: number) {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
}

async function updateUser(
  req: NextApiRequest,
  res: NextApiResponse,
  id: number
) {
  try {
    const { name, email, image, role, householdId } = req.body;
    const user = await prisma.user.update({
      where: { id },
      data: { name, email, image, role, householdId },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Error updating user", error });
  }
}

async function deleteUser(
  req: NextApiRequest,
  res: NextApiResponse,
  id: number
) {
  try {
    await prisma.user.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: "Error deleting user", error });
  }
}
