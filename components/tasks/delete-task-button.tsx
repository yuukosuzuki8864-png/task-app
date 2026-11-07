// components/tasks/delete-task-button.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

type Props = {
  taskId: string
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
      alert(data.error ?? '削除に失敗しました')
      return
    }

    router.refresh()
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