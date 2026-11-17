// lib/validations/contact.ts（新規作成）
import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: "お名前は必須です" })
    .max(50, { error: "50文字以内で入力してください" }),
  email: z.email({
    error: "メールアドレスの形式で入力してください",
  }),
  category: z.enum(["general", "support", "feedback"], {
    error: "お問い合わせ種別を選択してください",
  }),
  message: z
    .string()
    .trim()
    .min(10, {
      error:
        "お問い合わせ内容は10文字以上で入力してください",
    })
    .max(1000, { error: "1000文字以内で入力してください" }),
  agreeToPrivacyPolicy: z
    .boolean()
    .refine((value) => value === true, {
      error: "プライバシーポリシーへの同意が必要です",
    }),
});

export type ContactFormValues =
  z.infer<typeof contactSchema>;