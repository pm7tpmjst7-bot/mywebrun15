import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import AdminClient from './AdminClient'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any).role !== 'ADMIN') redirect('/home')

  const [users, activeSessions, totalVideos] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: { subscription: true },
      take: 100,
    }),
    prisma.session.count({ where: { expires: { gt: new Date() } } }),
    prisma.video.count(),
  ])

  return <AdminClient users={users as any} activeSessions={activeSessions} totalVideos={totalVideos} />
}
