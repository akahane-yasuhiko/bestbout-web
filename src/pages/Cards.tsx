import { useEffect, useState } from 'react'
import { api } from '@/lib/api'


type Card = { id: string; title: string; date?: string }


export default function Cards() {
    const [cards, setCards] = useState<Card[]>([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        let mounted = true
            ; (async () => {
                try {
                    const data = await api.listUpcomingCards()
                    if (mounted) setCards(data)
                } finally {
                    if (mounted) setLoading(false)
                }
            })()
        return () => { mounted = false }
    }, [])


    if (loading) return <p>Loading…</p>


    return (
        <section>
            <h1>Upcoming Cards</h1>
            <ul>
                {cards.map(c => (
                    <li key={c.id}>{c.title} {c.date ? `— ${c.date}` : ''}</li>
                ))}
            </ul>
        </section>
    )
}