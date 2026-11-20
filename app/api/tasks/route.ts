 
// app/api/tasks/route.ts
import { NextResponse, type NextRequest } from 'next/server'
import { Prisma } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma'
import { getTasks } from '@/lib/tasks'
import { getCurrentUser } from '@/lib/auth'
import { createTaskSchema } from '@/lib/validations/task'
//POST新規作成（create-task-dialog.tsx対応のroute.ts）

// app/api/tasks/route.ts（GET 関数を置き換える）
export async function GET() {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json(
      { error: 'ログインしてください' },
      { status: 401 },
    )
  }

  const tasks = await getTasks(user.id)
  return NextResponse.json(tasks)
}

type CreateTaskBody = {
  title: string
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json(
      { error: 'ログインしてください' },
      { status: 401 },
    )
  }

  const body = (await request.json().catch(() => null)) as
    CreateTaskBody | null

  if (!body) {
    return NextResponse.json(
      { error: 'JSON の形式が正しくありません' },
      { status: 400 },
    )
  }

  const result = createTaskSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0].message },
      { status: 400 },
    )
  }

  try {
    const task = await prisma.task.create({
      data: {
        title: result.data.title,
        // 説明が空のときは null（説明なし）として保存する
        description: result.data.description || null,
        userId: user.id,
      },
    })

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error('タスクの作成に失敗しました:', error)
    return NextResponse.json(
      {
        error:
          'タスクを保存できませんでした。時間をおいて試してください',
      },
      { status: 500 },
    )
  }
}