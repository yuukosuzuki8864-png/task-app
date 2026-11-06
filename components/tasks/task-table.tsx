// components/tasks/task-table.tsx
import Link from 'next/link'
import type { Task } from '@/generated/prisma/client'
import {
  EditTaskDialog,
} from '@/components/tasks/edit-task-dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { taskStatusLabels } from '@/lib/task-status'

type Props = {
  tasks: Task[]
}

export function TaskTable({ tasks }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>タイトル</TableHead>
          <TableHead>ステータス</TableHead>
          <TableHead>作成日</TableHead>
          <TableHead className="text-right">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell>
              <Link
                href={`/tasks/${task.id}`}
                className="hover:underline"
              >
                {task.title}
              </Link>
            </TableCell>
            <TableCell>
              {taskStatusLabels[task.status]}
            </TableCell>
            <TableCell>
              {task.createdAt.toLocaleDateString('ja-JP', {
                timeZone: 'Asia/Tokyo',
              })}
            </TableCell>
            <TableCell>
              <div className="flex justify-end gap-2">
                <EditTaskDialog task={task} />
                {/* 次のチュートリアルで削除ボタンを置く */}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}