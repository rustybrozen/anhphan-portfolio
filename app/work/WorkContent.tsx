'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowUpRight } from 'lucide-react';
import { Project, User } from '@/generated/prisma/client';
import Link from 'next/link';

interface WorkContentProps {
  projects: Project[];
  profile?: User | null; 
}
export default function WorkContent({ projects ,profile}: WorkContentProps) {
  return (
    <div className="min-h-screen flex flex-col w-full max-w-300 mx-auto border-x border-neutral-border dark:border-neutral-border-dark">

      <Header variant="back" backText="Back to Home" profile={profile} />

      <main className="flex-1">
    
        <div className="px-6 pt-16 pb-8 md:pt-24 md:pb-16 border-b border-neutral-border dark:border-neutral-border-dark">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 whitespace-pre-line">
            {'Selected\nProjects'}
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl font-light leading-relaxed">
            A curated collection of web applications, experiments, and open source contributions. Focused on performance, accessibility, and clean architecture.
          </p>
        </div>

     
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-16 px-6 py-16">
          {projects.map((project) => (
            <article key={project.id} className="group flex flex-col h-full cursor-pointer">
             
              <div className="aspect-square w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 mb-6 overflow-hidden relative">
                {project.image && (
                    <div 
                    className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    style={{ backgroundImage: `url('${project.image}')` }}
                    />
                )}
              </div>

           
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-2xl font-bold leading-tight group-hover:underline decoration-1 underline-offset-4">
                    {project.title}
                  </h2>
                  
                
                  {project.link && (
                    <Link href={project.link} target="_blank">
                        <ArrowUpRight 
                            size={24} 
                            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-neutral-400 group-hover:text-black dark:group-hover:text-white" 
                        />
                    </Link>
                  )}
                </div>

                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 line-clamp-2">
                  {project.description}
                </p>

                
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.techStack.split(',').map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 border border-neutral-200 dark:border-neutral-800 text-xs font-bold uppercase tracking-wider text-neutral-500"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}