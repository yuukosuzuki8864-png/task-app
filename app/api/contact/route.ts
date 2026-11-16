// app/api/contact/route.ts（新規作成・練習用）
import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, {
    error: "名前を入力してください",
  }),
  email: z.email({
    error: "メールアドレスの形式で入力してください",
  }),
  message: z.string().trim().min(10, {
    error: "お問い合わせ内容は10文字以上で入力してください",
  }),
});

export async function POST(request: Request) {
  const body = await request.json();
  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: "入力内容を確認してください",
        fieldErrors:
          z.flattenError(result.error).fieldErrors,
      },
      { status: 400 },
    );
  }

  // 練習なので保存せず、受け取った内容をターミナルに出す
  console.log("お問い合わせを受け付けました:", result.data);

  return NextResponse.json({ message: "送信しました" });
}