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
            <div style={{ marginBottom: '2rem' }}>
                <h1>BestBout</h1>
                <p style={{ opacity: 0.8 }}>格闘技の試合カード予想のコミュニティサイト。</p>
            </div>

            <h2 className="section-title">Featured Cards</h2>
            <div style={{ marginBottom: '3rem' }}>
                <CarouselCards cards={cards} />
            </div>

            <h2 className="section-title">Upcoming Cards</h2>
            <ul className="upcoming-list">
                {cards.map((card) => (
                    <li key={card.id} className="upcoming-card">
                        <Link to={`/card/${card.id}`} className="upcoming-link">
                            <div className="upcoming-title">{matchupTitle(card)}</div>
                            <div className="upcoming-meta">
                                {card.event} <span style={{ margin: '0 8px', opacity: 0.3 }}>|</span> {card.date}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}
