'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { LayoutGrid, ArrowUpRight, History, Layers, Server, Database, Terminal, Brain, MoreHorizontal, LucideIcon } from 'lucide-react';
import {  User, Project, Experience } from '@/generated/prisma/client';


interface TechStackItem {
  category: string;
  items: string[];
}


interface StatItem {
  value: string;
  label: string;
}


const ICON_MAP: Record<string, LucideIcon> = {
  "Frontend Ecosystem": LayoutGrid,
  "Backend Infrastructure": Server,
  "AI & LLM Engineering": Brain,
  "Data & DevOps": Database,
  "Tools & Workflow": Terminal,
  "Others": MoreHorizontal
};

const getIcon = (category: string) => ICON_MAP[category] || MoreHorizontal;

interface HomeContentProps {
  profile: User | null;
  techStack: TechStackItem[]; 
  projects: Project[];
  experiences: Experience[];
  stats: StatItem[]; 
}

export default function HomeContent({ profile, techStack, projects, experiences, stats }: HomeContentProps) {


  return (
    <div className="min-h-screen flex flex-col w-full max-w-300 mx-auto border-x border-neutral-border dark:border-neutral-border-dark">
      <Header profile={profile}/>

    
      <section className="relative border-b border-neutral-border dark:border-neutral-border-dark overflow-hidden">
        <div className="absolute inset-0 z-0 bg-neutral-50 dark:bg-[#111] text-neutral-300 dark:text-neutral-700 pointer-events-none">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(to right, currentColor 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />
        </div>
        <div className="relative z-10 px-6 py-16 md:py-24 grid md:grid-cols-[1fr_400px] gap-12 items-center">
          <div className="flex flex-col gap-6 order-2 md:order-1">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase whitespace-pre-line">
                {profile?.jobTitle || "..."}
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 text-lg md:text-xl max-w-xl font-light leading-relaxed">
                {profile?.bio || "..."}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/work" className="h-12 px-8 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-wider text-sm hover:opacity-80 transition-opacity flex items-center justify-center">
                View Projects
              </Link>
              <Link href="/contact" className="h-12 px-8 border border-neutral-300 dark:border-neutral-700 font-bold uppercase tracking-wider text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors bg-background-light dark:bg-background-dark flex items-center justify-center">
                Contact
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="w-full max-w-[320px] aspect-square bg-neutral-200 dark:bg-neutral-800 relative overflow-hidden group border border-neutral-200 dark:border-neutral-700">
              <div
                className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500"
                style={{ backgroundImage: `url('${profile?.image || "https://static.vecteezy.com/system/resources/previews/024/983/914/original/simple-user-default-icon-free-png.png"}')` }}
              />
            </div>
          </div>
        </div>
      </section>

    
      <section className="border-b border-neutral-border dark:border-neutral-border-dark bg-neutral-50 dark:bg-[#0f0f0f]">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-neutral-border dark:divide-neutral-border-dark border-b border-neutral-border dark:border-neutral-border-dark md:border-b-0">
          
      
          {stats.length > 0 ? stats.map((stat, index) => (
             <div key={index} className="p-8 flex flex-col gap-1 items-start">
                <span className="text-4xl font-black tracking-tighter">{stat.value}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                  {stat.label}
                </span>
             </div>
          )) : (
          
             <>
                <div className="p-8"><span className="text-neutral-400">No stats...</span></div>
                <div className="p-8"></div><div className="p-8"></div><div className="p-8"></div>
             </>
          )}

        </div>
      </section>

    
      <section className="border-b border-neutral-border dark:border-neutral-border-dark px-6 py-16 bg-background-light dark:bg-background-dark">
        <h2 className="text-2xl font-bold uppercase tracking-tight mb-12 flex items-center gap-2">
          <Layers size={22} className="text-black dark:text-white" />
          Tech Stack & Skills
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techStack.map((stack, index) => {
            const Icon = getIcon(stack.category);
            return (
              <div key={index} className="flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-sm">
                    <Icon size={20} className="text-neutral-700 dark:text-neutral-300" />
                  </div>
                  <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-900 dark:text-white">
                    {stack.category}
                  </h3>
                </div>
                <div className="border-l border-neutral-200 dark:border-neutral-800 pl-4">
                  <div className={`grid ${stack.items.length > 6 ? 'grid-cols-2' : 'grid-cols-1'} gap-x-4 gap-y-2`}>
                    {stack.items.map((item) => (
                      <span key={item} className="text-neutral-600 dark:text-neutral-400 font-mono text-sm hover:text-black dark:hover:text-white transition-colors cursor-default truncate">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

  
      <section className="border-b border-neutral-border dark:border-neutral-border-dark px-6 py-16">
        <h2 className="text-2xl font-bold uppercase tracking-tight mb-4 flex items-center gap-2">
          <LayoutGrid size={22} className="text-black dark:text-white" />
         Featured Work
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-12 max-w-2xl leading-relaxed">
          Building high-performance web applications with a focus on accessible minimalism. I turn complex problems into simple, beautiful interfaces
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              <div className="aspect-square w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 mb-4 overflow-hidden relative">
                {project.image && (
                    <div
                    className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    style={{ backgroundImage: `url('${project.image}')` }}
                    />
                )}
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold leading-tight group-hover:underline decoration-1 underline-offset-4">
                    {project.title}
                  </h3>
                  <p className="text-neutral-500 mt-1 text-sm">
                    {project.techStack.split(',').map(t => t.trim()).join(', ')}
                  </p>
                </div>
                {project.link && (
                    <Link href={project.link} target="_blank">
                        <ArrowUpRight
                        size={20}
                        className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                    </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

  
      <section className="border-b border-neutral-border dark:border-neutral-border-dark px-6 py-16">
        <h2 className="text-2xl font-bold uppercase tracking-tight mb-12 flex items-center gap-2">
          <History size={22} className="text-black dark:text-white" />
          Experience
        </h2>
        <div className="relative pl-8 md:pl-0">
          <div className="absolute left-0 md:left-45 top-2 bottom-0 w-px bg-neutral-300 dark:bg-neutral-700" />
          <div className="flex flex-col gap-12">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative flex flex-col md:flex-row gap-4 md:gap-16">
                <div className="md:w-45 md:text-right shrink-0">
                  <span className="text-sm font-mono text-neutral-500 dark:text-neutral-400 bg-background-light dark:bg-background-dark py-1 pr-2">
                    {/* Format Date đơn giản */}
                    {new Date(exp.startDate).getFullYear()} - {exp.current ? 'Present' : (exp.endDate ? new Date(exp.endDate).getFullYear() : '')}
                  </span>
                </div>
                <div className={`absolute -left-9.25 md:left-43.75 top-1.5 size-2.5 border-2 border-background-light dark:border-background-dark ring-1 ring-neutral-300 dark:ring-neutral-700 ${exp.current ? 'bg-black dark:bg-white' : 'bg-neutral-400 dark:bg-neutral-600'}`} />
                <div className="flex flex-col gap-2 max-w-2xl pt-0 md:pt-0">
                  <h3 className="text-xl font-bold">
                    {exp.title}
                  </h3>
                  <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                    {exp.company}
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer profile={profile} />
    </div>
  );
}