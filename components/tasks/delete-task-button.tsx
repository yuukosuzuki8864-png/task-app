// components/tasks/delete-task-button.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

type Props = {
  taskId: number
  taskTitle: string
}

export function DeleteTaskButton({
  taskId,
  taskTitle,
}: Props) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    const ok = window.confirm(
      `「${taskTitle}」を削除しますか？`,
    )
    if (!ok) {
      return
    }

    setIsDeleting(true)
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: 'DELETE',
    })
    setIsDeleting(false)

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      toast.error(data.error ?? '削除に失敗しました') // ★2
      return
    }

    router.refresh()
    toast.success('タスクを削除しました') // ★3

  }
  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? '削除中...' : '削除'}
    </Button>
  )
  }
