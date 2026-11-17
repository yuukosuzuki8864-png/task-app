// app/form-practice/profile/schema.ts（新規作成）
import { z } from "zod";

export const profileSchema = z.object({
  displayName: z
    .string()
    .min(1, { error: "表示名は必須です" })
    .max(50, { error: "50文字以内で入力してください" }),
  bio: z.string().max(200, {
    error: "200文字以内で入力してください",
  }),
  website: z
    .httpUrl({
      error: "URLの形式で入力してください",
    })
    .or(z.literal("")),
  role: z.enum(
    ["developer", "designer", "manager", "other"],
    {
      error: "役割を選択してください",
    },
  ),
});

export type ProfileFormValues =
  z.infer<typeof profileSchema>;