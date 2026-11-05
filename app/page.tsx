import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">トップページ</h1>
      <Link href="/tasks">
        <Button>新しいタスクを作成</Button>
      </Link>
    </main>
  )
}