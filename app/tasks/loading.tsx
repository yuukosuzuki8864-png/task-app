// app/tasks/loading.tsx（新しく作る）
import { Skeleton } from '@/components/ui/skeleton'
import {
  TaskTableSkeleton,
} from '@/components/tasks/task-table-skeleton'

export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-8">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-9 w-24" />
      </div>
      <TaskTableSkeleton />
    </div>
  )
}