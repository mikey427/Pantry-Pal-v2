import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/db";

export interface NextPageProps<SlugType = string> {
  params: { slug: SlugType };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function GET(request: NextRequest) {
  try {
    // Get the profile ID from the search params
    const searchParams = request.nextUrl.searchParams;
    const profileId = searchParams.get("profileId");
    console.log("profileId", profileId);

    if (!profileId) {
      return NextResponse.json(
        { error: "Profile ID is required" },
        { status: 400 }
      );
    }

    const profile = await db.profile.findUnique({
      where: {
        id: Number(profileId),
      },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Something went wrong fetching the profile" },
      { status: 500 }
    );
  }
}
