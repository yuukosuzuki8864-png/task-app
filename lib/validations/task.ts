// lib/validations/task.ts
import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z
    .string({ error: 'タイトルを入力してください' })
    .trim()
    .min(1, { error: 'タイトルを入力してください' })
    .max(100, {
      error: 'タイトルは100文字以内で入力してください',
    }),
  description: z
    .string()
    .trim()
    .max(1000, {
      error: '説明は1000文字以内で入力してください',
    })
    .optional(),
})

export type CreateTaskInput =
  z.infer<typeof createTaskSchema>