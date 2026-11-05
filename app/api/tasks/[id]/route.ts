// app/api/tasks/[id]/route.ts（ファイルを丸ごと置き換え）
import { NextResponse, type NextRequest } from 'next/server'
import { getTask } from '@/lib/tasks'

// 2つ目の引数の型。params は Promise で渡される
type Params = {
  params: Promise<{ id: string }>
}

export async function GET(
  _request: NextRequest,
  { params }: Params,
) {
  const { id } = await params
  const task = await getTask(id)

  if (!task) {
    return NextResponse.json(
      { error: 'タスクが見つかりません' },
      { status: 404 },
    )
  }

  return NextResponse.json(task)
}