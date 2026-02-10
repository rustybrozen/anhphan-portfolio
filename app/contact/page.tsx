import { prisma } from '@/lib/prisma';
import ContactContent from './ContactContent';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const profile = await prisma.user.findFirst();
  return <ContactContent profile={profile} />;
}