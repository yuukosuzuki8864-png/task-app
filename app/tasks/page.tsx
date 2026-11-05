// app/tasks/page.tsx
import { connection } from 'next/server'
import {
  CreateTaskDialog,
} from '@/components/tasks/create-task-dialog'
import { getTasks } from '@/lib/tasks'

export default async function TasksPage() {
  // 作り置きせず、リクエストのたびにデータベースを読む
  await connection()
  const tasks = await getTasks()

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">タスク一覧</h1>
        <CreateTaskDialog />
      </div>
      {tasks.length === 0 ? (
        <p className="text-muted-foreground">
          タスクはまだありません
        </p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="rounded-md border p-3"
            >
              {task.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}