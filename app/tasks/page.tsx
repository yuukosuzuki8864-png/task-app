export default function TasksPage(){
    return(
        <div>
            <h2>タスク一覧</h2>
            <p>登録されているタスクの一覧を表示します。</p>

            <table>
                <thead>
                    <tr>
                        <th>タスク名</th>
                        <th>ステータス</th>
                        <th>期限</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ランディングページのデザイン</td>
                        <td>進行中</td>
                        <td>2026-04-15</td>
                    </tr>
                    <tr>
                        <td>API エンドポイントの実装</td>
                        <td>未着手</td>
                        <td>2026-04-20</td>
                    </tr>
                    <tr>
                        <td>テスト作成</td>
                        <td>完了</td>
                        <td>2026-04-10</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}