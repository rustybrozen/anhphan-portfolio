'use client';

import { useState } from 'react';
import { Lock, Loader2, AlertCircle } from 'lucide-react';

export default function SettingsTab() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    

    if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match!");
        return;
    }
    if (formData.password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/system/pass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Password updated successfully!");
        setFormData({ password: '', confirmPassword: '' });
      } else {
        alert("Failed to update password.");
      }
    } catch {
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-2xl">
      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-tight">Settings</h2>
          <p className="text-neutral-500 text-sm mt-1">System configuration and security.</p>
        </div>
      </div>

      <div className="border border-neutral-200 dark:border-neutral-800 bg-background-light dark:bg-background-dark p-6 md:p-8">
         <div className="flex items-center gap-4 mb-6">
  
             <div>
                 <h3 className="font-bold text-lg">Change Password</h3>
             </div>
         </div>

         <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">New Password</label>
                <div className="flex items-center border border-neutral-200 dark:border-neutral-800 focus-within:border-black dark:focus-within:border-white transition-colors bg-white dark:bg-[#111]">
                    <div className="p-3 text-neutral-400">
                        <Lock size={16} />
                    </div>
                    <input 
                        type="password" 
                        required
                        placeholder="••••••••"
                        className="flex-1 bg-transparent p-3 text-sm outline-none font-mono"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Confirm Password</label>
                <div className="flex items-center border border-neutral-200 dark:border-neutral-800 focus-within:border-black dark:focus-within:border-white transition-colors bg-white dark:bg-[#111]">
                    <div className="p-3 text-neutral-400">
                        <Lock size={16} />
                    </div>
                    <input 
                        type="password" 
                        required
                        placeholder="••••••••"
                        className="flex-1 bg-transparent p-3 text-sm outline-none font-mono"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    />
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/10 p-3">
                    <AlertCircle size={16} /> {error}
                </div>
            )}

            <div className="pt-2">
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black text-sm font-bold uppercase tracking-wider hover:opacity-80 transition-opacity disabled:opacity-50"
                >
                    {isLoading ? <Loader2 size={16} className="animate-spin"/> : ""}
                    {isLoading ? 'Updating...' : 'Update Password'}
                </button>
            </div>
         </form>
      </div>
    </div>
  );
}