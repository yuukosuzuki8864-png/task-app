// lib/tasks.ts（新しく作るファイル）
import { prisma } from '@/lib/prisma'

// タスクの一覧を、新しく作った順に取得する
export async function getTasks() {
  return prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

// id でタスクを1件探す。見つからなければ null を返す
export async function getTask(id: string) {
  return prisma.task.findUnique({
    where: { id },
  })
}
