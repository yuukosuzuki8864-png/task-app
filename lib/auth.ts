// lib/auth.ts
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

// ログイン中のユーザーを返す（いなければ null を返す）
export async function getCurrentUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

// ページ用：ログインしていなければ /login へ移す
export async function requireUser() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/login')
  }
  return user
}