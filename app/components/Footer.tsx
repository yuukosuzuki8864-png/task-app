import styles from './Footer.module.css'

export const Footer=()=>{
    return(
        <footer className={styles.footer}>
            <p className={styles.copyright}>@2026 TaskApp</p>
            <p className={styles.copyleft}>Powered by Next.js</p>
        </footer>

    )
}