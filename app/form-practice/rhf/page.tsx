// app/form-practice/rhf/page.tsx（丸ごと置き換える）
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 1. Zod スキーマを定義する
const formSchema = z.object({
  name: z
    .string()
    .min(1, { error: "名前は必須です" })
    .max(50, { error: "50文字以内で入力してください" }),
  email: z.email({
    error: "メールアドレスの形式で入力してください",
  }),
  age: z
    .number({ error: "年齢を数字で入力してください" })
    .min(18, { error: "18歳以上である必要があります" }),
});

// 2. スキーマから型を作る
type FormValues = z.infer<typeof formSchema>;

// 3. フォームのコンポーネント
export default function ZodForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      age: 18,
    },
  });

  const onSubmit = (data: FormValues) => {
    // data は Zod のチェックを通った値
    console.log(data);
  };

  return (
    <div className="p-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-sm flex-col gap-2"
      >
        <input
          {...register("name")}
          placeholder="名前"
          className="rounded border px-2 py-1"
        />
        {errors.name && (
          <p className="text-sm text-red-500">
            {errors.name.message}
          </p>
        )}

        <input
          {...register("email")}
          placeholder="メール"
          className="rounded border px-2 py-1"
        />
        {errors.email && (
          <p className="text-sm text-red-500">
            {errors.email.message}
          </p>
        )}

        <input
          {...register("age", { valueAsNumber: true })}
          type="number"
          placeholder="年齢"
          className="rounded border px-2 py-1"
        />
        {errors.age && (
          <p className="text-sm text-red-500">
            {errors.age.message}
          </p>
        )}

        <button
          type="submit"
          className="rounded border px-4 py-1"
        >
          送信
        </button>
      </form>
    </div>
  );
}