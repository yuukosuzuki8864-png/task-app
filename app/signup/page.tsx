// app/signup/page.tsx
import Link from 'next/link'
import { SignupForm } from './signup-form'

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-sm space-y-6 px-6 py-12">
      <h1 className="text-2xl font-bold">アカウント作成</h1>
      <SignupForm />
      <p className="text-center text-sm text-muted-foreground">
        すでにアカウントをお持ちの方は
        <Link href="/login" className="ml-1 underline">
          ログイン
        </Link>
      </p>
    </div>
  )
}