import CardPoster from '@/components/CardPoster'
import { useState, useEffect } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import './posters.css'


type Poster = { id: string; title: string; date?: string; image?: string }


function Autoplay(interval = 2500) {
    return (slider: any) => {
        let timeout: number | undefined
        let mouseOver = false
        function clearNextTimeout() { if (timeout) window.clearTimeout(timeout) }
        function nextTimeout() {
            clearNextTimeout()
            if (mouseOver) return
            timeout = window.setTimeout(() => slider.next(), interval)
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


export default function PostersCarousel({ posters }: { posters: Poster[] }) {
    const [current, setCurrent] = useState(0)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
            mode: 'snap',
            renderMode: 'performance',
            slides: { perView: 1.15, spacing: 14 },
            breakpoints: {
                '(min-width: 640px)': { slides: { perView: 2.2, spacing: 16 } },
                '(min-width: 960px)': { slides: { perView: 3.25, spacing: 18 } },
                '(min-width: 1280px)': { slides: { perView: 4.1, spacing: 20 } },
            },
            created() { setCurrent(0) },
            slideChanged(s) { setCurrent(s.track.details.rel) }
        },
        [Autoplay(2800)]
    )


    useEffect(() => {
        // アクティブクラス管理
        const inst = instanceRef.current
        if (!inst) return
        const el = inst.container
        const slides = el.querySelectorAll('.keen-slider__slide')
        slides.forEach((s, i) => s.classList.toggle('kk-active', i === current))
    }, [current, instanceRef])


    return (
        <div className="kk-carousel keen-slider" ref={sliderRef}>
            {posters.map((p) => (
                <div key={p.id} className="keen-slider__slide kk-slide">
                    <CardPoster title={p.title} date={p.date} imageSrc={p.image} />
                </div>
            ))}
        </div>
    )
}