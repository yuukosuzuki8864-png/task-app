// app/tasks/[id]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { taskStatusLabels } from '@/lib/task-status'
import { getTask } from '@/lib/tasks'

type Props = {
  params: Promise<{ id: string }>
}

export default async function TaskDetailPage({
  params,
}: Props) {
  const { id } = await params
  const task = await getTask(id)

  // 見つからなければ、404 のページを表示する
  if (!task) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-8">
      <Link
        href="/tasks"
        className="text-sm text-muted-foreground
          hover:underline"
      >
        ← タスク一覧に戻る
      </Link>
      <h1 className="text-2xl font-bold">{task.title}</h1>
      <dl className="grid grid-cols-[8rem_1fr] gap-y-3">
        <dt className="text-muted-foreground">
          ステータス
        </dt>
        <dd>{taskStatusLabels[task.status]}</dd>
        <dt className="text-muted-foreground">説明</dt>
        <dd>{task.description ?? 'なし'}</dd>
        <dt className="text-muted-foreground">作成日時</dt>
        <dd>
          {task.createdAt.toLocaleString('ja-JP', {
            timeZone: 'Asia/Tokyo',
          })}
        </dd>
        <dt className="text-muted-foreground">更新日時</dt>
        <dd>
          {task.updatedAt.toLocaleString('ja-JP', {
            timeZone: 'Asia/Tokyo',
          })}
        </dd>
      </dl>
    </div>
  )
}

