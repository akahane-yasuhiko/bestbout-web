import PostersCarousel from '@/components/PostersCarousel'

const posters = [
    { id: 'p1', title: 'Main Event — A vs B', date: '2025-11-08' },
    { id: 'p2', title: 'Co-main — C vs D', date: '2025-11-08' },
    { id: 'p3', title: 'E vs F', date: '2025-11-22' },
    { id: 'p4', title: 'G vs H', date: '2025-12-06' },
]

export default function Home() {
    return (
        <section>
            <h1>BestBout</h1>
            <p>格闘技の試合カード予想のコミュニティサイト。</p>

            <div style={{ margin: '18px 0 28px' }}>
                <PostersCarousel posters={posters} />
            </div>
        </section>
    )
}
