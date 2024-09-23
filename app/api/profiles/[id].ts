import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      return getProfile(req, res, Number(id));
    case "PUT":
      return updateProfile(req, res, Number(id));
    case "DELETE":
      return deleteProfile(req, res, Number(id));
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

export async function getProfile(
  req: NextApiRequest,
  res: NextApiResponse,
  id?: number,
  token?: string
) {
  try {
    const profile = await prisma.profile.findUnique({ where: { id } });
    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
}

async function updateProfile(
  req: NextApiRequest,
  res: NextApiResponse,
  id: number
) {
  try {
    const { bio } = req.body;
    const profile = await prisma.profile.update({
      where: { id },
      data: { bio },
    });
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ message: "Error updating profile", error });
  }
}

async function deleteProfile(
  req: NextApiRequest,
  res: NextApiResponse,
  id: number
) {
  try {
    await prisma.profile.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: "Error deleting profile", error });
  }
}
