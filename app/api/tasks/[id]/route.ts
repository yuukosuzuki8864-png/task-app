// app/api/tasks/[id]/route.ts
import { NextResponse, type NextRequest } from 'next/server'
import { TaskStatus } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma'
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

export async function PATCH(
  request: NextRequest,
  { params }: Params,
) {
  const { id } = await params
  const body = await request.json().catch(() => null)

  if (!body) {
    return NextResponse.json(
      { error: 'JSON の形式が正しくありません' },
      { status: 400 },
    )
  }

  // 更新する項目だけを入れるオブジェクト
  const data: { title?: string; status?: TaskStatus } = {}

  // title が送られてきたときだけ、確かめて data に入れる
  if (body.title !== undefined) {
    if (
      typeof body.title !== 'string' ||
      body.title.trim() === ''
    ) {
      return NextResponse.json(
        { error: 'タイトルを入力してください' },
        { status: 400 },
      )
    }
    data.title = body.title
  }

  // status が送られてきたときだけ、確かめて data に入れる
  if (body.status !== undefined) {
    if (!Object.values(TaskStatus).includes(body.status)) {
      return NextResponse.json(
        { error: 'ステータスの値が正しくありません' },
        { status: 400 },
      )
    }
    data.status = body.status
  }

  const task = await prisma.task.update({
    where: { id },
    data,
  })

  return NextResponse.json(task)
}

// app/api/tasks/[id]/route.ts（ファイルの最後に追加）
export async function DELETE(
    _request: NextRequest,
    { params }: Params,
  ) {
    const { id } = await params
  
    await prisma.task.delete({
      where: { id },
    })
  
    // 削除できた。返す本文がないので 204 を返す
    return new NextResponse(null, { status: 204 })
  }