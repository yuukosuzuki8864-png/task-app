import Link from 'next/link'
import styles from './page.module.css'

export default function DashboardPage() {
  return (
    <div>
      <section className={styles.hero}>
        <h2 className={styles.heroTitle}>ダッシュボード</h2>
        <p className={styles.heroText}>
          タスクの概要を確認し、作業を管理しましょう。
        </p>
        <Link href="/tasks/new" className={styles.heroButton}>
          新しいタスクを作成
        </Link>
      </section>

      <section className={styles.sections}>
        <div className={styles.card}>
          <h3>未着手</h3>
          <p>まだ着手していないタスク</p>
          <Link href="/tasks?status=todo" className={styles.cardLink}>一覧を見る →</Link>
        </div>

        <div className={styles.card}>
          <h3>進行中</h3>
          <p>現在取り組んでいるタスク</p>
          <Link href="/tasks?status=in_progress" className={styles.cardLink}>一覧を見る →</Link>
        </div>

        <div className={styles.card}>
          <h3>完了</h3>
          <p>完了したタスク</p>
          <Link href="/tasks?status=done" className={styles.cardLink}>一覧を見る →</Link>
        </div>
      </section>
    </div>
  )
}