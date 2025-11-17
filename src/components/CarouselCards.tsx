import CardPoster from '@/components/CardPoster'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import type { CardSummary } from '@/lib/api'


// 自動再生プラグイン（公式サンプル流用）
function Autoplay(interval = 2500) {
    return (slider: any) => {
        let timeout: number | undefined
        let mouseOver = false
        function clearNextTimeout() { if (timeout) window.clearTimeout(timeout) }
        function nextTimeout() {
            clearNextTimeout()
            if (mouseOver) return
            timeout = window.setTimeout(() => { slider.next() }, interval)
        }
        slider.on('created', () => {
            slider.container.addEventListener('mouseover', () => { mouseOver = true; clearNextTimeout() })
            slider.container.addEventListener('mouseout', () => { mouseOver = false; nextTimeout() })
            nextTimeout()
        })
        slider.on('dragStarted', clearNextTimeout)
        slider.on('animationEnded', nextTimeout)
        slider.on('updated', nextTimeout)
    }
}


const matchupTitle = (card: CardSummary) =>
  card.fighters && card.fighters.length >= 2
    ? `${card.fighters[0]} vs ${card.fighters[1]}`
    : card.event ?? card.id

export default function CarouselCards({ cards }: { cards: CardSummary[] }) {
    const [loaded, setLoaded] = useState(false)
    const [sliderRef] = useKeenSlider(
        {
            loop: true,
            renderMode: 'performance',
            slides: { perView: 1.05, spacing: -60, origin: 'auto' },
            breakpoints: {
                '(min-width: 640px)': { slides: { perView: 2.3, spacing: 12, origin: 'auto' } },
                '(min-width: 960px)': { slides: { perView: 3.3, spacing: 14, origin: 'auto' } },
                '(min-width: 1280px)': { slides: { perView: 4.3, spacing: 16, origin: 'auto' } },
            },
        },
        [Autoplay(2500)]
    )


    useEffect(() => setLoaded(true), [])


    return (
        <div className="keen-slider" ref={sliderRef}>
            {cards.map((c) => (
                <article key={c.id} className="keen-slider__slide" style={{ background: 'transparent', padding: 0 }}>
                    <Link to={`/card/${c.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <CardPoster title={matchupTitle(c)} date={c.date} />
                    </Link>
                </article>
            ))}
        </div>
    )
}
