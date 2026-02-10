import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generalProfileSchema } from "@/lib/validations";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      image: true,
      jobTitle: true,
      bio: true,
      email: true,
      devNickname: true,
      contactEmail: true,
      phoneNumber: true,
      address: true,
      isOpenForWork: true,
      socials: true,
      stats:true
    },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const socialsParsed = user.socials ? JSON.parse(user.socials) : {};
  const statsParsed = user.stats ? JSON.parse(user.stats) : [];

  return NextResponse.json({
    ...user,
    socials: socialsParsed,
    stats: statsParsed,
  });
}

export async function PATCH(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validation = generalProfileSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validation.error.format() },
        { status: 400 },
      );
    }

    const data = validation.data;

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: data.name,
        image: data.image,
        jobTitle: data.jobTitle,
        bio: data.bio,
        devNickname: data.devNickname,
        contactEmail: data.contactEmail,
        phoneNumber: data.phoneNumber,
        address: data.address,
        isOpenForWork: data.isOpenForWork,
        socials: data.socials ? JSON.stringify(data.socials) : null,
        stats: data.stats ? JSON.stringify(data.stats) : null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
