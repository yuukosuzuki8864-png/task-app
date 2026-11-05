import Link from 'next/link'
import styles from './Header.module.css'

export const Header=()=>{
    return(
        <header className={styles.header}>
            <Link href="/" className={styles.logo}>
            <h1 className={styles.title}>TaskApp</h1>
            </Link>
            <nav className={styles.nav}>
                <Link href="/tasks" className={styles.navLink}>タスク一覧</Link>
                <Link href="/settings" className={styles.navLink}>設定</Link>
            </nav>
        </header>
    )
}