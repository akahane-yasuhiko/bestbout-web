import PostersCarousel from '@/components/PostersCarousel'


const posters = [
    { id: 'p1', title: 'Main Event — A vs B', date: '2025-11-08', image: 'https://picsum.photos/600/900?random=11' },
    { id: 'p2', title: 'Co-main — C vs D', date: '2025-11-08', image: 'https://picsum.photos/600/900?random=12' },
    { id: 'p3', title: 'E vs F', date: '2025-11-22', image: 'https://picsum.photos/600/900?random=13' },
    { id: 'p4', title: 'G vs H', date: '2025-12-06', image: 'https://picsum.photos/600/900?random=14' },
    { id: 'p5', title: 'I vs J', date: '2025-12-20', image: 'https://picsum.photos/600/900?random=15' },
]


export default function Home() {
    return (
        <section>
            <h1>BestBout</h1>
            <p>格闘技の試合カードに対するファンの予想を集め、誰がどれだけ当てたかをランキングで可視化します。</p>


            <div style={{ margin: '18px 0 28px' }}>
                <PostersCarousel posters={posters} />
            </div>
        </section>
    )
}