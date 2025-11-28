import blueskyLogo from '@/assets/bluesky.svg'

export const BlueskyIcon = ({ size = 20 }: { size?: number }) => (
    <img src={blueskyLogo} alt="Bluesky" width={size} height={size} style={{ display: 'block' }} />
)
