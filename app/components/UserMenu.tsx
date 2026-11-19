// app/components/UserMenu.tsx
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { LogoutButton } from './LogoutButton'

export async function UserMenu() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div className="flex gap-4 text-sm">
        <Link href="/login" className="underline">
          ログイン
        </Link>
        <Link href="/signup" className="underline">
          アカウント作成
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4 text-sm">
      <span>{user.email}</span>
      <LogoutButton />
    </div>
  )
}