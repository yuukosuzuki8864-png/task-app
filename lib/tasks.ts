// lib/tasks.ts
import { prisma } from '@/lib/prisma'
import { cache } from 'react'

// ログイン中のユーザーのタスクだけを、新しい順に返す
export async function getTasks(userId: string) {
  return prisma.task.findMany({
    where: { userId },
    orderBy: { insertedAt: 'desc' },
  })
}

// id と userId の両方が一致するタスクを1件返す
// 無ければ null を返す
export const getTask = cache(
  async (id: number, userId: string) => {
    console.log('getTask', id)
    return prisma.task.findFirst({
      where: { id, userId },
    })
  },
)