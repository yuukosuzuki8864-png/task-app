// app/form-practice/zod/page.tsx（新規作成）
import { z } from "zod";

// ここから：チュートリアルごとに書き換える部分
// app/form-practice/zod/page.tsx
// 「ここから」〜「ここまで」を置き換える
// app/form-practice/zod/page.tsx
// 「ここから」〜「ここまで」を置き換える
const schema = z
  .object({
    password: z.string().min(8, {
      error: "パスワードは8文字以上にしてください",
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

const samples: unknown[] = [
  {
    password: "password123",
    confirmPassword: "password123",
  },
  {
    password: "password123",
    confirmPassword: "password124",
  },
  { password: "pass", confirmPassword: "pass" },
];
// ここまで

function check(value: unknown) {
  try {
    const data = schema.parse(value);
    return `OK: ${JSON.stringify(data)}`;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.issues.map(
        (issue) =>
          `${issue.path.join(".")} ${issue.message}`,
      );
      return `NG: ${messages.join(" / ")}`;
    }
    throw error;
  }
}

export default function ZodPracticePage() {
  return (
    <div className="space-y-3 p-8">
      <h1 className="text-xl font-bold">Zod の練習</h1>
      {samples.map((sample, index) => (
        <div
          key={index}
          className="rounded border p-3 font-mono text-sm"
        >
          <p>入力: {JSON.stringify(sample)}</p>
          <p>結果: {check(sample)}</p>
        </div>
      ))}
    </div>
  );
}