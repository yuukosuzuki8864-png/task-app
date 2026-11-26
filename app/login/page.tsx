// app/login/page.tsx（ファイル全体を置き換え）
import Link from 'next/link'
import { LoginForm } from './login-form'

type Props = {
  searchParams: Promise<{ redirectTo?: string }>
}

export default async function LoginPage({
  searchParams,
}: Props) {
  const { redirectTo } = await searchParams

  return (
    <div className="mx-auto max-w-sm space-y-6 px-6 py-12">
      <h1 className="text-2xl font-bold">ログイン</h1>
      {/* 戻り先が無いときは /tasks に戻す */}
      <LoginForm redirectTo={redirectTo ?? '/tasks'} />
      <p className="text-center text-sm text-muted-foreground">
        アカウントをお持ちでない方は
        <Link href="/signup" className="ml-1 underline">
          こちらから登録
        </Link>
      </p>
    </div>
  )
}