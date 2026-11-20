// app/tasks/error.tsx（新しく作る）
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

type Props = {
  error: Error & { digest?: string }
  retry: () => void
}

export default function TasksError({ error, retry }: Props) {
  useEffect(() => {
    // エラーの内容をブラウザのコンソールに出す
    console.error(error)
  }, [error])

  return (
    <div className="space-y-4 p-8">
      <h2 className="text-xl font-semibold">
        タスクの読み込みに失敗しました
      </h2>
      <p className="text-muted-foreground">
        時間をおいて、もう一度お試しください。
      </p>
      <Button onClick={() => retry()}>もう一度読み込む</Button>
    </div>
  )
}