import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { passwordSchema } from "@/lib/validations";

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    

    const validation = passwordSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }




    await auth.api.setPassword({
    body: {
        newPassword: validation.data.password,
    },
    headers: await headers() 
});

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
  }
}