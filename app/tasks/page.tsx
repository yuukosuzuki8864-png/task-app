// app/tasks/page.tsx
import { Suspense } from 'react'
import {
  CreateTaskDialog,
} from '@/components/tasks/create-task-dialog'
import { TaskTable } from '@/components/tasks/task-table'
import {
  TaskTableSkeleton,
} from '@/components/tasks/task-table-skeleton'
import { requireUser } from '@/lib/auth'
import { getTasks } from '@/lib/tasks'

// ログイン中のユーザーのタスクを取得して表を表示する部分
async function TaskListSection({ userId }: { userId: string }) {
  const tasks = await getTasks(userId)

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
  const user = await requireUser()

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">タスク一覧</h1>
        <CreateTaskDialog />
      </div>

      <Suspense fallback={<TaskTableSkeleton />}>
        <TaskListSection userId={user.id} />
      </Suspense>
    </div>
  )
}