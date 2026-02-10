import { prisma } from '@/lib/prisma';
import HomeContent from './HomeContent';

export const dynamic = 'force-dynamic'; // Bắt buộc render lại mỗi lần request để lấy data mới nhất

export default async function HomePage() {
  const profile = await prisma.user.findFirst();
  let techStack = [];
  try {
    if (profile?.techStack) {
      techStack = JSON.parse(profile.techStack);
    }
  } catch (e) {
    console.error("Error parsing tech stack JSON", e);
  }
  let stats = [];
  try { if (profile?.stats) stats = JSON.parse(profile.stats); } catch { }

  const projects = await prisma.project.findMany({
    where: { featured: true },
    orderBy: { createdAt: 'desc' },
  });


  const experiences = await prisma.experience.findMany({
    orderBy: { order: 'asc' },
  });


  return (
    <HomeContent
      profile={profile}
      techStack={techStack}
      projects={projects}
      experiences={experiences}
      stats={stats}
    />
  );
}