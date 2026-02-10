import { Terminal } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-[#0f0f0f] px-4 font-sans relative overflow-hidden">


      <div className="w-full max-w-[400px] bg-background-light dark:bg-background-dark border border-neutral-200 dark:border-neutral-800 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-500">
        {children}
      </div>

    
      <Link href="/" className="absolute top-8 left-8 text-neutral-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2 text-sm font-mono z-20">
         <Terminal size={16} /> ~/back-to-home
      </Link>
    </div>
  );
}