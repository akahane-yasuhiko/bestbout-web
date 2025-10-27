import { Link } from 'react-router-dom'


export default function NotFound() {
    return (
        <section>
            <h1>404 Not Found</h1>
            <p>ページが見つかりませんでした。</p>
            <p><Link to="/">トップへ戻る</Link></p>
        </section>
    )
}