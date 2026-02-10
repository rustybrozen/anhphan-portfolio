'use client';

import Link from 'next/link';
import { ArrowLeft, Terminal, Github, Twitter, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { User } from '@/generated/prisma/client';
import { ElementType } from 'react';

const SOCIAL_ICONS: Record<string, ElementType> = {
  github: Github,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  reddit: MessageCircle,
};

interface HeaderProps {
  variant?: 'default' | 'back';
  backText?: string;
  profile?: User | null; 
}

export default function Header({ variant = 'default', backText, profile }: HeaderProps) {
  const btnClass = "flex items-center justify-center border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white";


  let socialLinks: { platform: string; url: string }[] = [];
  try {
    if (profile?.socials) {
      const parsed = JSON.parse(profile.socials);
      socialLinks = Object.entries(parsed)
        .map(([key, value]) => ({ platform: key, url: value as string }))
        .filter(item => item.url && item.url.trim() !== ''); 
    }
  } catch {

  }


  if (variant === 'back') {
    return (
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-neutral-border dark:border-neutral-border-dark bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm px-6 py-4">
        <Link 
          href="/"
          className="group flex items-center gap-3 text-sm font-bold uppercase tracking-wider hover:opacity-70 transition-opacity"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          {backText}
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm font-mono text-neutral-500 hidden md:inline-block">
            View Work
          </span>
          <div className="w-px h-4 bg-neutral-300 dark:bg-neutral-700 hidden md:block" />
        
          <div className="flex gap-2">
            {socialLinks.slice(0, 2).map(({ platform, url }) => { 
                const Icon = SOCIAL_ICONS[platform];
                if (!Icon) return null;
                return (
                    <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`size-8 rounded-sm ${btnClass}`}
                    aria-label={platform}
                    >
                    <Icon size={16} />
                    </a>
                );
            })}
          </div>
        </div>
      </header>
    );
  }


  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-neutral-border dark:border-neutral-border-dark bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm px-6 py-4">
      <Link href="/" className="flex items-center gap-4 group">
        <div className="size-8 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black group-hover:opacity-90 transition-opacity">
          <Terminal size={18} />
        </div>
        <h2 className="text-lg font-bold tracking-tight uppercase">
        
          {profile?.devNickname || 'Dev'}
        </h2>
      </Link>
      
      <div className="flex gap-2">
       
        {socialLinks.map(({ platform, url }) => {
            const Icon = SOCIAL_ICONS[platform];
            if (!Icon) return null; 

            return (
                <a 
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`size-10 ${btnClass}`}
                  aria-label={platform}
                >
                  <Icon size={20} />
                </a>
            );
        })}
      </div>
    </header>
  );
}