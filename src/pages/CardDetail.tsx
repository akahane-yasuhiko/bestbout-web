import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api, CardDetail, Prediction } from '@/lib/api'

const matchupTitle = (card: CardDetail) =>
  card.fighters && card.fighters.length >= 2
    ? `${card.fighters[0]} vs ${card.fighters[1]}`
    : card.event ?? card.id

const formatDate = (value?: string) => {
  if (!value) return ''
  return new Date(value).toLocaleDateString('ja-JP', { dateStyle: 'medium' })
}

const formatDateTime = (value: string) =>
  new Date(value).toLocaleString('ja-JP', { dateStyle: 'short', timeStyle: 'short' })

export default function CardDetailPage() {
  const { cardId } = useParams<{ cardId: string }>()
  const [card, setCard] = useState<CardDetail | null>(null)
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!cardId) {
      setError('カードIDが不正です')
      setLoading(false)
      return
    }
    let mounted = true
      ; (async () => {
        try {
          const [cardData, predictionItems] = await Promise.all([
            api.getCard(cardId),
            api.listPredictionsForCard(cardId)
          ])
          if (!cardData) {
            if (mounted) setError('カード情報が見つかりません')
            return
          }
          if (mounted) {
            setCard(cardData)
            setPredictions(predictionItems)
          }
        } catch (e) {
          console.error(e)
          if (mounted) setError('データの取得に失敗しました')
        } finally {
          if (mounted) setLoading(false)
        }
      })()
    return () => {
      mounted = false
    }
  }, [cardId])

  if (loading) return <p>Loading…</p>
  if (error) return <p>{error}</p>
  if (!card) return <p>カード情報がありません。</p>

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <Link to="/cards" style={{ textDecoration: 'none', fontSize: 14 }}>
          ← カード一覧へ戻る
        </Link>
        <p style={{ margin: '12px 0 4px', opacity: 0.8 }}>{card.event}</p>
        <h1 style={{ fontSize: 28, margin: 0 }}>{matchupTitle(card)}</h1>
        {card.date && (
          <p style={{ marginTop: 6, fontSize: 16, opacity: 0.9 }}>
            {formatDate(card.date)} {card.weight_class ? `· ${card.weight_class}` : ''}
          </p>
        )}
      </div>

      <div className="predictions-section">
        <h2 style={{ fontSize: 20, marginBottom: 16 }}>Predictions</h2>
        {predictions.length === 0 ? (
          <p style={{ opacity: 0.8 }}>まだ予想がありません。</p>
        ) : (
          <table className="predictions-table">
            <thead>
              <tr>
                <th>Predictor</th>
                <th>Platform</th>
                <th>Date</th>
                <th>Pick</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((p) => (
                <tr key={p.id}>
                  <td>
                    <span style={{ fontWeight: 600 }}>@{p.predictor_handle}</span>
                  </td>
                  <td>
                    <a
                      href={p.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textTransform: 'capitalize', opacity: 0.8, color: 'inherit', textDecoration: 'underline' }}
                    >
                      {p.platform}
                    </a>
                  </td>
                  <td style={{ fontSize: 14, opacity: 0.8 }}>{formatDateTime(p.posted_at)}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700 }}>{p.winner_pick}</span>
                      {p.hit === true && <span className="badge-hit">HIT</span>}
                      {p.hit === false && <span className="badge-miss">MISS</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}
