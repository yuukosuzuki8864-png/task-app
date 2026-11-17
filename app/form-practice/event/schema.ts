// app/form-practice/event/schema.ts（新規作成）
import { z } from "zod";

export const eventSchema = z.object({
  // テキスト入力
  title: z
    .string()
    .min(1, { error: "タイトルは必須です" })
    .max(100, { error: "100文字以内で入力してください" }),
  description: z.string().max(500, {
    error: "500文字以内で入力してください",
  }),

  // Select（決まった選択肢から1つ）
  category: z.enum(["conference", "workshop", "meetup"], {
    error: "カテゴリを選択してください",
  }),

  // RadioGroup（決まった選択肢から1つ）
  visibility: z.enum(["public", "private"], {
    error: "公開設定を選択してください",
  }),

  // Checkbox（true か false）
  isOnline: z.boolean(),
  agreeToTerms: z
    .boolean()
    .refine((value) => value === true, {
      error: "利用規約への同意が必要です",
    }),
});

export type EventFormValues = z.infer<typeof eventSchema>;