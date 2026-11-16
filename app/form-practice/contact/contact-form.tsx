// app/form-practice/contact/contact-form.tsx（新規作成）
"use client";

import { useState } from "react";

type ContactResponse = {
  message?: string;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export function ContactForm() {
  const [errors, setErrors] =
    useState<Record<string, string[]>>({});
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();
    setIsPending(true);
    setErrors({});
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data: ContactResponse = await response.json();

    if (!response.ok) {
      setErrors(data.fieldErrors ?? {});
      setMessage(data.error ?? "送信に失敗しました");
    } else {
      setMessage(data.message ?? "送信しました");
    }

    setIsPending(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label
          htmlFor="name"
          className="block text-sm font-medium"
        >
          名前
        </label>
        <input
          id="name"
          name="name"
          className="w-full rounded border px-2 py-1"
        />
        {errors.name && (
          <p className="text-sm text-red-500">
            {errors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label
          htmlFor="email"
          className="block text-sm font-medium"
        >
          メールアドレス
        </label>
        <input
          id="email"
          name="email"
          className="w-full rounded border px-2 py-1"
        />
        {errors.email && (
          <p className="text-sm text-red-500">
            {errors.email[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label
          htmlFor="message"
          className="block text-sm font-medium"
        >
          お問い合わせ内容
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full rounded border px-2 py-1"
        />
        {errors.message && (
          <p className="text-sm text-red-500">
            {errors.message[0]}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-black px-4 py-2 text-white
          disabled:opacity-50"
      >
        {isPending ? "送信中..." : "送信する"}
      </button>

      {message && <p className="text-sm">{message}</p>}
    </form>
  );
}