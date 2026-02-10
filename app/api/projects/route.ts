import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validations";

// GET: Lấy toàn bộ projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }, // Mới nhất lên đầu
    });
    return NextResponse.json(projects);
  } catch  {
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

// POST: Tạo project mới
export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const validation = projectSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const newProject = await prisma.project.create({
      data: validation.data,
    });

    return NextResponse.json(newProject);
  } catch {
    return NextResponse.json({ error: "Create Failed" }, { status: 500 });
  }
}