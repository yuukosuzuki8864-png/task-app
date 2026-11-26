// app/@modal/(.)tasks/[id]/page.tsx（新しく作ります）
import { requireUser } from '@/lib/auth'
import { getTask } from '@/lib/tasks'
import { TaskModal } from './task-modal'

type Props = { params: Promise<{ id: string }> }

export default async function TaskModalPage({
  params,
}: Props) {
  const user = await requireUser()
  const { id } = await params
  const task = await getTask(Number(id), user.id)

  if (!task) {
    return null
  }

  return <TaskModal task={task} />
}