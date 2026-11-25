import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { requireUser } from '@/lib/auth'
import { taskStatusLabels } from '@/lib/task-status'
import { getTask } from '@/lib/tasks'

type Props = {
  params: Promise<{ id: string }>
}

// app/tasks/[id]/page.tsx（TaskDetailPageの上に足す）
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const user = await requireUser()
  const { id } = await params
  const task = await getTask(Number(id), user.id)

  if (!task) {
    return { title: 'タスクが見つかりません' }
  }

  return {
    title: task.title,
    description: task.description ?? 'タスクの詳細ページです',
  }
}

export default async function TaskDetailPage({ params }: Props) {
  const user = await requireUser()
  const { id } = await params

  const taskId = Number(id)
  if (Number.isNaN(taskId)) {
    notFound()
  }

  const task = await getTask(taskId, user.id)

  if (!task) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-8">
      <Link href="/tasks" className="text-sm text-muted-foreground hover:underline">
        ← タスク一覧に戻る
      </Link>
      <h1 className="text-2xl font-bold">{task.title}</h1>
      <dl className="grid grid-cols-[8rem_1fr] gap-y-3">
        <dt className="text-muted-foreground">ステータス</dt>
        <dd>{taskStatusLabels[task.status]}</dd>
        <dt className="text-muted-foreground">説明</dt>
        <dd>{task.description ?? 'なし'}</dd>
        <dt className="text-muted-foreground">作成日時</dt>
        <dd>
          {task.insertedAt.toLocaleString('ja-JP', {
            timeZone: 'Asia/Tokyo',
          })}
        </dd>
        <dt className="text-muted-foreground">更新日時</dt>
        <dd>
          {task.updatedAt
            ? task.updatedAt.toLocaleString('ja-JP', {
                timeZone: 'Asia/Tokyo',
              })
            : 'なし'}
        </dd>
      </dl>
    </div>
  )
}