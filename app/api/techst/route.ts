import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { techStackSchema } from "@/lib/validations";


const DEFAULT_STACK = [
  { category: "Frontend Ecosystem", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand", "React Query"] },
  { category: "Backend Infrastructure", items: ["NestJS", "Fastify", "Node.js", "Socket.IO", "C# (.NET)"] },
  { category: "AI & LLM Engineering", items: ["Python", "LangChain", "RAG Systems", "ChromaDB", "Ollama / vLLM", "Hugging Face"] },
  { category: "Data & DevOps", items: ["PostgreSQL", "Prisma", "Docker", "Coolify", "Redis"] },
  { category: "Tools & Workflow", items: ["Git/GitHub", "Linux (VPS)", "CI/CD", "Postman", "Figma"] },
  { category: "Others / Exploring", items: ["Go (Learning)", "WebAssembly", "UI/UX Design"] }
];


export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { techStack: true },
  });

  // Nếu DB chưa có, trả về mặc định
  if (!user?.techStack) {
    return NextResponse.json(DEFAULT_STACK);
  }

  try {
    const parsedStack = JSON.parse(user.techStack);
    return NextResponse.json(parsedStack);
  } catch  {
    // Nếu JSON lỗi, trả về mặc định luôn cho an toàn
    return NextResponse.json(DEFAULT_STACK);
  }
}


export async function PATCH(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    

    const validation = techStackSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: "Invalid data structure" }, { status: 400 });
    }


    await prisma.user.update({
      where: { id: session.user.id },
      data: { techStack: JSON.stringify(validation.data) },
    });

    return NextResponse.json({ success: true });
  } catch  {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}