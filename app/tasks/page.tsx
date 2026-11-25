// app/tasks/page.tsx（ファイル全体を置き換える）
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { connection } from 'next/server'
import {
  CreateTaskDialog,
} from '@/components/tasks/create-task-dialog'
import { TaskTable } from '@/components/tasks/task-table'
import {
  TaskTableSkeleton,
} from '@/components/tasks/task-table-skeleton'
import { getTasks } from '@/lib/tasks'
import { requireUser } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'タスク一覧',
  description: '自分のタスクを一覧で確認できます',
}
// タスクを取得して表を表示する部分
async function TaskListSection() {
  const user = await requireUser()
  const tasks = await getTasks(user.id)

  if (tasks.length === 0) {
    return (
      <p className="text-muted-foreground">
        タスクはまだありません
      </p>
    )
  }

  return <TaskTable tasks={tasks} />
}

export default async function TasksPage() {
  // 作り置きせず、リクエストのたびにデータベースを読む
  await connection()

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">タスク一覧</h1>
        <CreateTaskDialog />
      </div>

      <Suspense fallback={<TaskTableSkeleton />}>
        <TaskListSection />
      </Suspense>
    </div>
  )
}