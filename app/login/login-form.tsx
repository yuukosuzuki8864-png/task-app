// app/login/login-form.tsx
'use client'

import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Field,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'

const loginSchema = z.object({
  email: z.email({
    error: '有効なメールアドレスを入力してください',
  }),
  password: z
    .string()
    .min(6, {
      error: 'パスワードは6文字以上で入力してください',
    }),
})

type LoginFormValues = z.infer<typeof loginSchema>

// app/login/login-form.tsx（LoginFormの上に足す）
// 戻り先が、このアプリの中のURLかを確かめる
function toSafeUrl(redirectTo: string) {
  try {
    // 今開いているサイトを土台に、URLを組み立てる
    const url = new URL(redirectTo, window.location.origin)
    // 同じサイトのURLのときだけ、戻り先に使う
    if (url.origin === window.location.origin) {
      return url.href
    }
  } catch {
    // URLとして読めない値は使わない
  }
  return '/tasks'
}

export function LoginForm({
  redirectTo,
}: {
  redirectTo: string
}){
 
  const [serverError, setServerError] =
    useState<string | null>(null)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  async function onSubmit(values: LoginFormValues) {
    setServerError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })

    if (error) {
      setServerError(
        'メールアドレスまたはパスワードが正しくありません',
      )
      return
    }
    window.location.assign(toSafeUrl(redirectTo))
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className="space-y-4"
    >
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="login-email">
              メールアドレス
            </FieldLabel>
            <Input
              {...field}
              id="login-email"
              type="email"
              aria-invalid={fieldState.invalid}
              placeholder="you@example.com"
            />
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="login-password">
              パスワード
            </FieldLabel>
            <Input
              {...field}
              id="login-password"
              type="password"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      {serverError && (
        <p className="text-sm text-destructive">
          {serverError}
        </p>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting
          ? 'ログイン中...'
          : 'ログイン'}
      </Button>
    </form>
  )
}