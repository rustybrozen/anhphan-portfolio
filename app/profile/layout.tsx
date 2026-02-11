import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";


export const dynamic = 'force-dynamic';

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  

  const session = await auth.api.getSession({
    headers: headersList,
  });

 
  if (!session) {
    return (
      <div className="p-8 bg-black text-green-400 font-mono text-sm min-h-screen">
        <h1 className="text-red-500 font-bold text-2xl mb-6">🚨 SERVER ĐANG BỊ MÙ COOKIE 🚨</h1>
        
        <div className="space-y-4">
          <p><strong>1. BETTER_AUTH_URL (Server Env):</strong> {process.env.BETTER_AUTH_URL || '❌ THIẾU BIẾN NÀY'}</p>
          <p><strong>2. Host Request:</strong> {headersList.get('host') || '❌ Không có'}</p>
          <p><strong>3. X-Forwarded-Proto (Giao thức):</strong> {headersList.get('x-forwarded-proto') || '❌ Không có'}</p>
          
          <div className="mt-6 p-4 border border-green-800 bg-green-900/20 rounded">
            <p className="font-bold text-yellow-400 mb-2">4. COOKIES MÀ SERVER NHẬN ĐƯỢC TỪ TRÌNH DUYỆT:</p>
            <p className="break-all text-white">
              {headersList.get('cookie') || 'TRỐNG LỐC'}
            </p>
          </div>
        </div>
      </div>
    );
  }

 
  return (
    <>
      {children}
    </>
  );
}