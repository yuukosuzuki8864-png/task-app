// app/login/page.tsx
import Link from 'next/link'
import { LoginForm } from './login-form'

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm space-y-6 px-6 py-12">
      <h1 className="text-2xl font-bold">ログイン</h1>
      <LoginForm />
      <p className="text-center text-sm text-muted-foreground">
        アカウントをお持ちでない方は
        <Link href="/signup" className="ml-1 underline">
          こちらから登録
        </Link>
      </p>
    </div>
  )
}