import cardsUrl from '@/data/cards.sample.json?url'
import predictionsUrl from '@/data/predictions.sample.json?url'

const API_BASE = import.meta.env.VITE_API_BASE

export type CardSummary = {
  id: string
  event: string
  fighters?: string[]
  date?: string
  weight_class?: string
  status?: string
  poster_image?: string
  fight_url?: string
}

export type CardDetail = CardSummary & {
  venue?: string
  description?: string
  stats?: Record<string, number>
}

export type Prediction = {
  id: string
  card_id: string
  predictor_handle: string
  platform: string
  posted_at: string
  winner_pick: string
  method?: string | null
  round?: number | null
  confidence?: number | null
  source_url: string
  notes?: string | null
  hit?: boolean | null
  evaluated_at?: string | null
}

type PredictionCollection = {
  items: Prediction[]
  nextCursor?: string | null
}

async function fetchJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init)
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json()
}

let cachedCards: CardSummary[] | null = null
async function loadSampleCards(): Promise<CardSummary[]> {
  if (cachedCards) return cachedCards
  cachedCards = await fetchJson<CardSummary[]>(cardsUrl)
  return cachedCards
}

let cachedPredictions: PredictionCollection | null = null
async function loadSamplePredictions(): Promise<PredictionCollection> {
  if (cachedPredictions) return cachedPredictions
  cachedPredictions = await fetchJson<PredictionCollection>(predictionsUrl)
  return cachedPredictions
}

export const api = {
  async listUpcomingCards(): Promise<CardSummary[]> {
    if (API_BASE) {
      return fetchJson<CardSummary[]>(`${API_BASE}/cards?status=upcoming`, {
        headers: { accept: 'application/json' }
      })
    }
    return loadSampleCards()
  },

  async getCard(cardId: string): Promise<CardDetail | undefined> {
    if (API_BASE) {
      return fetchJson<CardDetail>(`${API_BASE}/cards/${cardId}`, {
        headers: { accept: 'application/json' }
      })
    }
    const cards = await loadSampleCards()
    return cards.find((c) => c.id === cardId)
  },

  async listPredictionsForCard(cardId: string): Promise<Prediction[]> {
    if (API_BASE) {
      const data = await fetchJson<PredictionCollection>(`${API_BASE}/cards/${cardId}/predictions`, {
        headers: { accept: 'application/json' }
      })
      return data.items
    }
    const data = await loadSamplePredictions()
    return data.items.filter((p) => p.card_id === cardId)
  }
}
