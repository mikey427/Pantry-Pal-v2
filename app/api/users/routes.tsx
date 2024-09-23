// pages/api/users/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getUsers(req, res);
    case "POST":
      return createUser(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
}

async function createUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, email, image, role, householdId } = req.body;
    const user = await prisma.user.create({
      data: { name, email, image, role, householdId },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
}
