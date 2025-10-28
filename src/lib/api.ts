import sampleUrl from '@/data/cards.sample.json?url'

const API_BASE = import.meta.env.VITE_API_BASE

export const api = {
  async listUpcomingCards(): Promise<Array<{ id: string; title: string; date?: string }>> {
    if (API_BASE) {
      const r = await fetch(`${API_BASE}/cards?status=upcoming`, { headers: { accept: 'application/json' } })
      if (!r.ok) throw new Error(`API error ${r.status}`)
      return r.json()
    }
    // バンドル済みのアセットURLを叩くので404にならない
    const r = await fetch(sampleUrl)
    if (!r.ok) throw new Error(`Sample not found: ${sampleUrl}`)
    return r.json()
  }
}
