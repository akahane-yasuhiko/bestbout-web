import { useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'


type Card = { id: string; title: string; date?: string }


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


export default function CarouselCards({ cards }: { cards: Card[] }) {
    const [loaded, setLoaded] = useState(false)
    const [sliderRef] = useKeenSlider(
        {
            loop: true,
            renderMode: 'performance',
            slides: { perView: 1.1, spacing: 12 },
            breakpoints: {
                '(min-width: 640px)': { slides: { perView: 2.2, spacing: 16 } },
                '(min-width: 960px)': { slides: { perView: 3.2, spacing: 18 } },
                '(min-width: 1280px)': { slides: { perView: 4.2, spacing: 20 } },
            },
        },
        [Autoplay(2500)]
    )


    useEffect(() => setLoaded(true), [])


    return (
        <div className="keen-slider" ref={sliderRef}>
            {cards.map((c) => (
                <article
                    key={c.id}
                    className="keen-slider__slide"
                    style={{
                        background: '#0f172a',
                        color: 'white',
                        borderRadius: 16,
                        padding: 16,
                        boxShadow: '0 6px 24px rgba(0,0,0,.15)'
                    }}
                >
                    <header style={{ fontWeight: 700, marginBottom: 8 }}>{c.title}</header>
                    <div style={{ opacity: .8 }}>{c.date ?? 'TBA'}</div>
                </article>
            ))}
        </div>
    )
}