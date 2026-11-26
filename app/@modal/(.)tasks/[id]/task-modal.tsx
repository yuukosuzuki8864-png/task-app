// app/@modal/(.)tasks/[id]/task-modal.tsx（新しく作ります）
'use client'

import { useRouter } from 'next/navigation'
import type { Task } from '@/generated/prisma/client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { taskStatusLabels } from '@/lib/task-status'

export function TaskModal({ task }: { task: Task }) {
  const router = useRouter()

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) router.back()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
          <DialogDescription>
            {task.description || '説明はありません'}
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm">
  ステータス：{taskStatusLabels[task.status]}
</p>
      </DialogContent>
    </Dialog>
  )
}