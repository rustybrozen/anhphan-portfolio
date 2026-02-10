'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'; // Thêm icon cho sinh động
import { User } from '@/generated/prisma/client';

interface ContactContentProps {
  profile: User | null;
}

export default function ContactContent({ profile }: ContactContentProps) {

  const socialsJson = profile?.socials ? JSON.parse(profile.socials) : {};
  const socialLinks = Object.entries(socialsJson)
    .filter(([, url]) => typeof url === 'string' && url.length > 0)
    .map(([platform, url]) => ({
      name: platform.charAt(0).toUpperCase() + platform.slice(1),
      url: url as string
    }));

  return (
    <div className="min-h-screen flex flex-col w-full max-w-300 mx-auto border-x border-neutral-border dark:border-neutral-border-dark">
      <Header variant="back" backText="Back to Home" />

      <main className="flex-1 flex flex-col justify-center">
        <section className="px-6 py-16 md:py-24 border-b border-neutral-border dark:border-neutral-border-dark">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase mb-8 whitespace-pre-line">
             {'Say\nHello'}
            </h1>

            <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-16 max-w-2xl">
              {"I'm open to new opportunities. If you're looking for a developer who is dedicated and loves to code, drop me a message."}
            </p>

            <div className="grid md:grid-cols-2 gap-12 md:gap-24">
         
              <div className="space-y-8">
                {profile?.contactEmail && (
                  <div className="group">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-2 flex items-center gap-2">
                      <Mail size={16} /> Email
                    </h3>
                    <a
                      href={`mailto:${profile.contactEmail}`}
                      className="text-2xl md:text-4xl font-bold hover:underline decoration-2 underline-offset-4 break-words"
                    >
                      {profile.contactEmail}
                    </a>
                  </div>
                )}

                {profile?.phoneNumber && (
                  <div className="group">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-2 flex items-center gap-2">
                      <Phone size={16} /> Phone
                    </h3>
                    <a
                      href={`tel:${profile.phoneNumber}`}
                      className="text-xl md:text-2xl font-medium hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                    >
                      {profile.phoneNumber}
                    </a>
                  </div>
                )}
              </div>

             <div className="space-y-8">
                {profile?.address && (
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-2 flex items-center gap-2">
                      <MapPin size={16} /> Location
                    </h3>
                    <p className="text-xl font-medium">{profile.address}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-4">Connect</h3>
                  <div className="flex flex-wrap gap-4">
                    {socialLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                      >
                        <span className="font-medium">{link.name}</span>
                        <ArrowUpRight size={16} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}