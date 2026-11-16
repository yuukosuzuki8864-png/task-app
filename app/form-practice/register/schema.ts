// app/form-practice/register/schema.ts（新規作成）
import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, {
        error: "ユーザー名は3文字以上で入力してください",
      })
      .max(20, {
        error: "ユーザー名は20文字以内で入力してください",
      })
      .regex(/^[a-zA-Z0-9_]+$/, {
        error: "半角英数字とアンダースコアのみ使用できます",
      }),
    email: z.email({
      error: "メールアドレスの形式で入力してください",
    }),
    password: z
      .string()
      .min(8, {
        error: "パスワードは8文字以上で入力してください",
      })
      .regex(/[A-Z]/, {
        error: "大文字を1文字以上含めてください",
      })
      .regex(/[0-9]/, {
        error: "数字を1文字以上含めてください",
      }),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      error: "パスワードが一致しません",
      path: ["confirmPassword"],
    },
  );

export type RegisterFormValues =
  z.infer<typeof registerSchema>;