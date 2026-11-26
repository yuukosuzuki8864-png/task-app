// app/signup/signup-form.tsx
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

const signupSchema = z
  .object({
    email: z.email({
      error: '有効なメールアドレスを入力してください',
    }),
    password: z
      .string()
      .min(6, {
        error: 'パスワードは6文字以上で入力してください',
      }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    error: 'パスワードが一致しません',
  })

type SignupFormValues = z.infer<typeof signupSchema>

export function SignupForm() {
  const [serverError, setServerError] =
    useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  })

  async function onSubmit(values: SignupFormValues) {
    setServerError(null)
    setNotice(null)

    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    })

    if (error) {
      setServerError(error.message)
      return
    }

    // Confirm email が ON のときは、session が null で返る
    if (!data.session) {
      setNotice(
        '確認メールを送りました。' +
          'メールのリンクを開いてから、ログインしてください。'
      )
      return
    }

    window.location.assign('/tasks')
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
            <FieldLabel htmlFor="signup-email">
              メールアドレス
            </FieldLabel>
            <Input
              {...field}
              id="signup-email"
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
            <FieldLabel htmlFor="signup-password">
              パスワード
            </FieldLabel>
            <Input
              {...field}
              id="signup-password"
              type="password"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Controller
        name="passwordConfirm"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="signup-password-confirm">
              パスワード（確認）
            </FieldLabel>
            <Input
              {...field}
              id="signup-password-confirm"
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
      {notice && <p className="text-sm">{notice}</p>}

      <Button
        type="submit"
        className="w-full"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting
          ? '登録中...'
          : 'アカウントを作成'}
      </Button>
    </form>
  )
}