import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getProfiles(req, res);
    case "POST":
      return createProfile(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

async function getProfiles(req: NextApiRequest, res: NextApiResponse) {
  try {
    const profiles = await prisma.profile.findMany();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profiles", error });
  }
}

async function createProfile(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { bio, userId } = req.body;
    const profile = await prisma.profile.create({
      data: { bio, userId },
    });
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ message: "Error creating profile", error });
  }
}
