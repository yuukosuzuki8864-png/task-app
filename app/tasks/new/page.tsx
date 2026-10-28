import styles from './page.module.css'

export default function NewTaskPage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>タスクを作成</h2>
      <p className={styles.description}>
        新しいタスクの情報を入力してください。
      </p>

      <form className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="title" className={styles.label}>タスク名</label>
          <input
            type="text"
            id="title"
            name="title"
            className={styles.input}
            placeholder="ランディングページのデザイン"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="status" className={styles.label}>ステータス</label>
          <select
            id="status"
            name="status"
            className={styles.input}
          >
            <option value="todo">未着手</option>
            <option value="in_progress">進行中</option>
            <option value="done">完了</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="dueDate" className={styles.label}>期限</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="description" className={styles.label}>説明</label>
          <textarea
            id="description"
            name="description"
            className={styles.textarea}
            placeholder="タスクの詳細を入力してください"
            rows={5}
          />
        </div>

        <button type="submit" className={styles.button}>
          タスクを作成
        </button>
      </form>
    </div>
  )
}