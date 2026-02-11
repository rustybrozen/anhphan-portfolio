'use client';

import { useState, useEffect } from 'react';
import { signIn, signUp, useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowRight, Mail, Lock, ShieldCheck } from 'lucide-react';


export default function AuthPage() {
  const [status, setStatus] = useState<'loading' | 'login' | 'setup'>('loading');
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace('/profile');
    }
  }, [session, router]);

  useEffect(() => {
    const checkSystem = async () => {
      try {
        const res = await fetch('/api/system/status');
        const data = await res.json();
        setStatus(data.initialized ? 'login' : 'setup');
      } catch  {
        setStatus('login'); 
      }
    };
    checkSystem();
  }, []);



  if (status === 'loading') {
    return (
      <div className="p-12 flex flex-col items-center justify-center gap-4 text-neutral-400 min-h-[300px]">
        <Loader2 size={32} className="animate-spin" />
      </div>
    );
  }

  return status === 'login' ? <LoginForm /> : <SetupForm onSuccess={() => setStatus('login')} />;
}


function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await signIn.email({
        email: formData.email,
        password: formData.password,
    }, {
        onSuccess: () => router.refresh(),
        onError: (ctx) => {
            alert(ctx.error.message);
            setIsLoading(false);
        }
    });
  };

  return (
    <>
      <div className="p-8 border-b border-neutral-200 dark:border-neutral-800 text-center">
    
      </div>
      <form onSubmit={handleLogin} className="p-8 space-y-5">
        <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-2"><Mail size={12} /> Email</label>
            <input required type="email" placeholder="example@mail.dev" className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 p-3 text-sm outline-none" 
             value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
        </div>
        <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-2"><Lock size={12} /> Password</label>
            <input required type="password" placeholder="••••••••" className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 p-3 text-sm outline-none font-mono" 
             value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
        </div>
        <button type="submit" disabled={isLoading} className="w-full h-12 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-wider text-sm hover:opacity-80 transition-opacity flex items-center justify-center gap-2 mt-4">
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <>Authenticate <ArrowRight size={18} /></>}
        </button>
      </form>
    </>
  );
}


function SetupForm({ onSuccess }: { onSuccess: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: 'Your Name' });

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
    }, {
        onSuccess: () => {
            alert("System Initialized! Please login.");
            onSuccess();
        },
        onError: (ctx) => {
            alert(ctx.error.message);
            setIsLoading(false);
        }
    });
  };

  return (
    <>
      <div className="p-8 border-b border-neutral-200 dark:border-neutral-800 text-center bg-yellow-50 dark:bg-yellow-900/10">
        <p className="text-sm text-neutral-600 dark:text-neutral-400 font-mono">No owner found. Create your account.</p>
      </div>
      <form onSubmit={handleSetup} className="p-8 space-y-5">
        <div className="space-y-2">
             <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Your Name</label>
             <input required type="text" placeholder="Owner Name" className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 p-3 text-sm outline-none" 
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        </div>
        <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Email</label>
            <input required type="email" placeholder="example@mail.dev" className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 p-3 text-sm outline-none" 
             value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
        </div>
        <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Password</label>
            <input required type="password" placeholder="••••••••" className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 p-3 text-sm outline-none font-mono" 
             value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
        </div>
        <button type="submit" disabled={isLoading} className="w-full h-12 bg-yellow-500 text-white font-bold uppercase tracking-wider text-sm hover:opacity-80 transition-opacity flex items-center justify-center gap-2 mt-4">
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <>Create Owner </>}
        </button>
      </form>
    </>
  );
}