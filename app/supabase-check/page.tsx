// app/supabase-check/page.tsx（新しく作るファイル）
import { createClient } from '@/lib/supabase/server'

export default async function SupabaseCheckPage() {
  const supabase = await createClient()
  const { error } = await supabase.storage.listBuckets()

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">
        Supabase 接続チェック
      </h2>
      {error ? (
        <p className="text-red-600">
          接続できませんでした: {error.message}
        </p>
      ) : (
        <p className="text-green-700">
          Supabase に接続できました。
        </p>
      )}
    </div>
  )
}