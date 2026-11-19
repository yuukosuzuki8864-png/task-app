// app/components/LogoutButton.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

export function LogoutButton() {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  async function handleLogout() {
    setIsPending(true)

    const supabase = createClient()
    await supabase.auth.signOut()

    router.push('/login')
    router.refresh()
  }

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleLogout}
      disabled={isPending}
    >
      {isPending ? 'ログアウト中...' : 'ログアウト'}
    </Button>
  )
}