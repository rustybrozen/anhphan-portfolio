import { prisma } from '@/lib/prisma';
import WorkContent from './WorkContent';

export const dynamic = 'force-dynamic'; 

export default async function WorkPage() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  const profile = await prisma.user.findFirst();

return <WorkContent projects={projects} profile={profile} />;
}