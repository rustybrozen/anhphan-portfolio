/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { Bug, X } from 'lucide-react';

export default function AuthDebugger() {
  const [debugData, setDebugData] = useState<any>({ status: 'Loading...' });
  const [isOpen, setIsOpen] = useState(true);
  const { data: session, isPending, error } = useSession();

  useEffect(() => {
    const runDiagnostics = async () => {
      // 1. Check Cookie trình duyệt
      const allCookies = typeof document !== 'undefined' ? document.cookie : '';
      
      // 2. Gọi thử một API auth trực tiếp để xem mã lỗi thật
      let apiRawStatus = 'Not Fetched';
      try {
        const res = await fetch('/api/auth/get-session');
        apiRawStatus = `${res.status} ${res.statusText}`;
      } catch (err: any) {
        apiRawStatus = err.message;
      }

      setDebugData({
        'Biến ENV (Client)': process.env.NEXT_PUBLIC_BETTER_AUTH_URL || '❌ NULL',
        'Cookies đang có': allCookies ? allCookies.split(';').map(c => c.trim()) : '❌ TRỐNG LỐC',
        'Raw API /get-session': apiRawStatus,
        'URL hiện tại': window.location.href,
        'Better Auth Error': error?.message || 'Không có lỗi client',
      });
    };

    runDiagnostics();
  }, [error]);

  if (!isOpen) return (
    <button onClick={() => setIsOpen(true)} className="fixed bottom-4 left-4 bg-red-600 text-white p-2 rounded-full z-50 shadow-lg">
      <Bug size={24} />
    </button>
  );

  return (
    <div className="fixed bottom-0 left-0 w-full max-h-[40vh] bg-black/95 text-green-400 font-mono text-xs z-[9999] overflow-y-auto border-t-4 border-red-500 shadow-2xl backdrop-blur-md">
      <div className="sticky top-0 bg-neutral-900 p-2 border-b border-neutral-700 flex justify-between items-center text-white">
        <span className="font-bold flex items-center gap-2"><Bug size={16} className="text-red-500"/> TRẠM GÁC DEBUG</span>
        <button onClick={() => setIsOpen(false)}><X size={16}/></button>
      </div>
      <div className="p-4 space-y-4">
        <div>
           <span className="text-yellow-400 font-bold">Trạng thái useSession:</span> 
           {isPending ? ' ⏳ Đang check...' : session ? ' ✅ Đã đăng nhập!' : ' ❌ Mất Session'}
        </div>
        
        <div className="bg-neutral-900/50 p-3 rounded">
          <pre className="whitespace-pre-wrap break-all leading-relaxed">
            {JSON.stringify(debugData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}