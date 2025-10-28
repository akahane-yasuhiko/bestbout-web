import React from 'react'


export type CardPosterProps = {
    title: string
    date?: string
    imageSrc?: string // 未指定なら汎用ポスターを使用
}


export default function CardPoster({ title, date, imageSrc }: CardPosterProps) {
    const src = imageSrc ?? `${import.meta.env.BASE_URL}images/posters/generic-fight-poster.webp`
    return (
        <figure style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', boxShadow: '0 12px 28px rgba(0,0,0,.25)' }}>
            <img
                src={src}
                alt={title}
                loading="lazy"
                style={{ width: '100%', height: '100%', display: 'block', aspectRatio: '2 / 3', objectFit: 'cover' }}
            />
            {/* 下部グラデ＋テキスト */}
            <div style={{ position: 'absolute', inset: 'auto 0 0 0', padding: '12px 14px' }}>
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '45%', background: 'linear-gradient(to top, rgba(0,0,0,.85), rgba(0,0,0,0))' }} />
                <figcaption style={{ position: 'relative', color: '#fff', fontWeight: 800, textShadow: '0 2px 8px rgba(0,0,0,.45)' }}>
                    <div style={{ fontSize: 18, lineHeight: 1.25 }}>{title}</div>
                    {date && <div style={{ fontSize: 14, opacity: .9, marginTop: 2 }}>{date}</div>}
                </figcaption>
            </div>
        </figure>
    )
}