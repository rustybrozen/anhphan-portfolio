'use client';

import { User } from "@/generated/prisma/client";

interface FooterProps {
  profile?: User | null; 
}

export default function Footer({ profile }: FooterProps) {
  return (
    <footer className="px-6 py-12 flex justify-center items-center bg-neutral-50 dark:bg-[#0f0f0f] border-t border-neutral-200 dark:border-neutral-800">
      <p className="text-sm text-neutral-500 font-mono text-center">
        © {new Date().getFullYear()} {profile?.devNickname || 'Dev'} - All rights reserved.
      </p>
    </footer>
  );
}