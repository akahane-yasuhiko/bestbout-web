const API_BASE = import.meta.env.VITE_API_BASE


export const api = {
    async listUpcomingCards(): Promise<Array<{ id: string; title: string; date?: string }>> {
        if (API_BASE) {
            const r = await fetch(`${API_BASE}/cards?status=upcoming`, { headers: { 'accept': 'application/json' } })
            if (!r.ok) throw new Error('API error')
            return r.json()
        }
        // fallback: 静的サンプル
        const r = await fetch(`${import.meta.env.BASE_URL}data/cards.sample.json?url`)
        return r.json()
    }
}