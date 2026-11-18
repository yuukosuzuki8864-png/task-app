 
// app/api/tasks/route.ts
import { NextResponse, type NextRequest } from 'next/server'
import { Prisma } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma'
import { getTasks } from '@/lib/tasks'

//POST新規作成（create-task-dialog.tsx対応のroute.ts）

export async function GET() {
  const tasks = await getTasks()
  return NextResponse.json(tasks)
}

type CreateTaskBody = {
  title: string
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    CreateTaskBody | null

  if (!body) {
    return NextResponse.json(
      { error: 'JSON の形式が正しくありません' },
      { status: 400 },
    )
  }

  if (
    typeof body.title !== 'string' ||
    body.title.trim() === ''
  ) {
    return NextResponse.json(
      { error: 'タイトルを入力してください' },
      { status: 400 },
    )
  }

  try {
    const task = await prisma.task.create({
      data: {
        title: body.title,
        status: 'TODO',
      },
    })

    return NextResponse.json(
      {
        ...task,
        id: task.id.toString(),
        categoryId: task.categoryId?.toString() ?? null,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('タスクの作成に失敗しました:', error)

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return NextResponse.json(
        { error: 'タスクが見つかりません' },
        { status: 404 },
      )
    }

    return NextResponse.json(
      {
        error:
          'タスクを保存できませんでした。時間をおいて試してください',
      },
      { status: 500 },
    )
  }
}