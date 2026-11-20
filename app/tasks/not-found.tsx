// app/tasks/not-found.tsx（新しく作る）
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function TaskNotFound() {
  return (
    <div className="space-y-4 p-8">
      <h2 className="text-xl font-semibold">
        このタスクは存在しません
      </h2>
      <p className="text-muted-foreground">
        削除されたか、URLが間違っている可能性があります。
      </p>
      <Button asChild variant="secondary">
        <Link href="/tasks">一覧に戻る</Link>
      </Button>
    </div>
  )
}