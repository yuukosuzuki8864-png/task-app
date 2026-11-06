// lib/task-status.ts
import type { TaskStatus } from '@/generated/prisma/client'

// ステータスの値と、画面に表示する名前の対応表
export const taskStatusLabels: Record<TaskStatus, string> = {
  TODO: '未着手',
  IN_PROGRESS: '進行中',
  DONE: '完了',
}