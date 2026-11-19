// lib/auth.ts（新しく作るファイル）
import { createClient } from '@/lib/supabase/server'

// ログイン中のユーザーを返す（いなければ null を返す）
export async function getCurrentUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}