import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { prisma } from '@/lib/prisma';
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const profile = await prisma.user.findFirst();

  const title = profile?.devNickname || 'Dev'; 
  const description = profile?.jobTitle || 'Portfolio';
  const image = profile?.image || '/default-avatar.png'; 

  return {
    title: {
      default: title,
      template: `%s | ${title}`, 
    },
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [image],
    },
    icons: {
      icon: '/favicon.ico', 
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
  
      </head>
      <body className={`${inter.variable} font-sans bg-background-light dark:bg-background-dark text-black dark:text-white antialiased selection:bg-neutral-200 dark:selection:bg-neutral-800`}>
        {children}
      </body>
    </html>
  );
}