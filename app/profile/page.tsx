'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    User,
    Briefcase,
    Layers,
    Settings,
    LogOut,
    Menu,
    X,
    Home,

} from 'lucide-react';
import GeneralTab from './GeneralTab';
import ProjectsTab from './ProjectsTab';
import ExperienceTab from './ExperienceTab';
import NavItem from './components/NavItem';
import TechStackTab from './TechStackTab';
import SettingsTab from './SettingsTab';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth-client'; 

export default function AdminDashboard() {
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('projects');

    const renderContent = () => {
        switch (activeTab) {
            case 'general': return <GeneralTab />;
            case 'projects': return <ProjectsTab />;
            case 'experience': return <ExperienceTab />;
            case 'tech-stack': return <TechStackTab />;
            case 'settings': return <SettingsTab />;
            default: return <ProjectsTab />;
        }
    };
    const handleLogout = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/"); 
                },
            },
        });
    };

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-[#0f0f0f] text-black dark:text-white font-sans flex overflow-hidden">

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}


            <aside className={`
                fixed inset-y-0 left-0 z-40 w-64 
                bg-white dark:bg-[#111] 
                border-r border-neutral-200 dark:border-neutral-800 
                transform transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:relative md:translate-x-0
            `}>
                <div className="h-full flex flex-col">
                    <div className="h-16 flex items-center px-6 border-b border-neutral-200 dark:border-neutral-800">
                        <span className="text-lg font-black uppercase tracking-tighter flex items-center gap-2">
                            Profile
                        </span>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="ml-auto md:hidden p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        <NavItem
                            active={activeTab === 'tech-stack'}
                            onClick={() => { setActiveTab('tech-stack'); setSidebarOpen(false); }}
                            icon={Layers}
                            label="Tech Stack"
                        />
                        <NavItem
                            active={activeTab === 'general'}
                            onClick={() => { setActiveTab('general'); setSidebarOpen(false); }}
                            icon={User}
                            label="General Info"
                        />
                        <NavItem
                            active={activeTab === 'projects'}
                            onClick={() => { setActiveTab('projects'); setSidebarOpen(false); }}
                            icon={Layers}
                            label="Projects"
                        />
                        <NavItem
                            active={activeTab === 'experience'}
                            onClick={() => { setActiveTab('experience'); setSidebarOpen(false); }}
                            icon={Briefcase}
                            label="Experience"
                        />
                        <NavItem
                            active={activeTab === 'settings'}
                            onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }}
                            icon={Settings}
                            label="Settings"
                        />
                    </nav>

                    <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#111]">
<button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-md transition-colors text-left"
            >
                <LogOut size={18} /> Log out
            </button>
                        <Link href="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-white-500 hover:bg-white-50 dark:hover:bg-white-900/10 rounded-md transition-colors">
                            <Home size={18} /> Back to home
                        </Link>
                    </div>
                </div>
            </aside>


            <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
                <header className="md:hidden h-16 flex items-center justify-between px-6 bg-white dark:bg-[#111] border-b border-neutral-200 dark:border-neutral-800 shrink-0">
                    <span className="font-bold uppercase tracking-wider text-sm">Dashboard</span>
                    <button onClick={() => setSidebarOpen(true)} className="p-2 -mr-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md">
                        <Menu size={24} />
                    </button>
                </header>
                <div className="flex-1 overflow-y-auto p-4 md:p-12">
                    <div className="max-w-5xl mx-auto">
                        {renderContent()}
                    </div>
                </div>
            </main>
        </div>
    );
}