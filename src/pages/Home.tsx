import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, CardSummary } from '@/lib/api'
import CarouselCards from '@/components/CarouselCards'

const matchupTitle = (card: CardSummary) =>
    card.fighters && card.fighters.length >= 2
        ? `${card.fighters[0]} vs ${card.fighters[1]}`
        : card.event ?? card.id

export default function Home() {
    const [cards, setCards] = useState<CardSummary[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let mounted = true
            ; (async () => {
                try {
                    const data = await api.listUpcomingCards()
                    if (mounted) setCards(data)
                } catch (err) {
                    console.error(err)
                    if (mounted) setError('カード一覧の取得に失敗しました')
                } finally {
                    if (mounted) setLoading(false)
                }
            })()
        return () => {
            mounted = false
        }
    }, [])

    if (loading) return <p>Loading…</p>
    if (error) return <p>{error}</p>

    return (
        <section>
            <h1>BestBout</h1>
            <p>格闘技の試合カード予想のコミュニティサイト。</p>

            <div style={{ margin: '18px 0 28px' }}>
                <CarouselCards cards={cards} />
            </div>

            <h2>Upcoming Cards</h2>
            <ul style={{ display: 'grid', gap: 12, paddingLeft: 0, listStyle: 'none' }}>
                {cards.map((card) => (
                    <li
                        key={card.id}
                        style={{
                            border: '1px solid rgba(255,255,255,.1)',
                            borderRadius: 12,
                            padding: '12px 16px',
                            background: 'rgba(255,255,255,.02)'
                        }}
                    >
                        <Link to={`/card/${card.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            <div style={{ fontWeight: 700 }}>{matchupTitle(card)}</div>
                            <div style={{ fontSize: 14, opacity: 0.85 }}>
                                {card.event} {card.date ? ` / ${card.date}` : ''}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}
