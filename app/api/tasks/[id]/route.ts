// app/api/tasks/[id]/route.ts
import { NextResponse, type NextRequest } from 'next/server'
import { TaskStatus } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { getTask } from '@/lib/tasks'

// 2つ目の引数の型。params は Promise で渡される
type Params = {
  params: Promise<{ id: string }>
}

export async function GET(
  _request: NextRequest,
  { params }: Params,
) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json(
      { error: 'ログインしてください' },
      { status: 401 },
    )
  }

  const { id } = await params
  const task = await getTask(Number(id), user.id)

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
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json(
      { error: 'ログインしてください' },
      { status: 401 },
    )
  }

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

  try {
    // id と userId の両方が一致する行だけを更新する
    const result = await prisma.task.updateMany({
      where: { id: Number(id), userId: user.id },
      data,
    })

    // 1件も更新されなかった = 無いか、他人のタスク
    if (result.count === 0) {
      return NextResponse.json(
        { error: 'タスクが見つかりません' },
        { status: 404 },
      )
    }

    const task = await getTask(Number(id), user.id)
    return NextResponse.json(task)
  } catch (error) {
    console.error('タスクの更新に失敗しました:', error)
    return NextResponse.json(
      {
        error:
          'タスクを更新できませんでした。時間をおいて試してください',
      },
      { status: 500 },
    )
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: Params,
) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json(
      { error: 'ログインしてください' },
      { status: 401 },
    )
  }

  const { id } = await params

  try {
    // id と userId の両方が一致する行だけを削除する
    const result = await prisma.task.deleteMany({
      where: { id: Number(id), userId: user.id },
    })

    if (result.count === 0) {
      return NextResponse.json(
        { error: 'タスクが見つかりません' },
        { status: 404 },
      )
    }

    // 削除できた。返す本文がないので 204 を返す
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('タスクの削除に失敗しました:', error)
    return NextResponse.json(
      {
        error:
          'タスクを削除できませんでした。時間をおいて試してください',
      },
      { status: 500 },
    )
  }
}