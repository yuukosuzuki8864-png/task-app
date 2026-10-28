// app/tasks/[id]/page.tsx
export default async function TaskDetailPage({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const { id } = await params
  
    return (
      <div>
        <h1>タスク詳細</h1>
        <p>タスク ID: {id}</p>
        <p>ここにタスクの詳細情報を表示します。</p>
      </div>
    )
  }