import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { experienceSchema } from "@/lib/validations";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(experiences);
  } catch {
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const validation = experienceSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });

    const lastItem = await prisma.experience.findFirst({
      orderBy: { order: "desc" },
    });
    const newOrder = lastItem ? lastItem.order + 1 : 0;

    const newExp = await prisma.experience.create({
      data: {
        ...validation.data,
        order: newOrder,
      },
    });

    return NextResponse.json(newExp);
  } catch {
    return NextResponse.json({ error: "Create Failed" }, { status: 500 });
  }
}
