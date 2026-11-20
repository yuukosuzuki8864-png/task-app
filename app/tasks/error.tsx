// app/tasks/error.tsx（ファイル全体を置き換える）
'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Props = {
  error: Error & { digest?: string }
  retry: () => void
}

export default function TasksError({ error, retry }: Props) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="space-y-4 p-8">
      <h2 className="text-xl font-semibold">
        タスクの読み込みに失敗しました
      </h2>
      <p className="text-muted-foreground">
        一時的な問題かもしれません。接続を確認して、もう一度お試しください。
      </p>
      <div className="flex gap-2">
        <Button onClick={() => retry()}>
          もう一度読み込む
        </Button>
        <Button asChild variant="secondary">
          <Link href="/tasks">一覧に戻る</Link>
        </Button>
      </div>
      {error.digest && (
        <p className="text-xs text-muted-foreground">
          お問い合わせの際は、このIDをお伝えください：
          {error.digest}
        </p>
      )}
    </div>
  )
}