import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { experienceSchema } from "@/lib/validations";

type RouteParams = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, props: RouteParams) {
  const params = await props.params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const validation = experienceSchema.safeParse(body);
    if (!validation.success) return NextResponse.json({ error: "Invalid Data" }, { status: 400 });

    const updated = await prisma.experience.update({
      where: { id: params.id },
      data: validation.data,
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Update Failed" }, { status: 500 });
  }
}


export async function DELETE(req: Request, props: RouteParams) {
  const params = await props.params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await prisma.experience.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch  {
    return NextResponse.json({ error: "Delete Failed" }, { status: 500 });
  }
}