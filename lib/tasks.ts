// lib/tasks.ts
import { prisma } from '@/lib/prisma'

// ログイン中のユーザーのタスクだけを、新しい順に返す
export async function getTasks(userId: string) {
  return prisma.task.findMany({
    where: { userId },
    orderBy: { insertedAt: 'desc' },
  })
}

// id と userId の両方が一致するタスクを1件返す
// 無ければ null を返す
export async function getTask(id: number, userId: string) {
  return prisma.task.findFirst({
    where: { id, userId },
  })
}