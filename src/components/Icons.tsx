import blueskyLogo from '@/assets/bluesky.svg'
import xLogo from '@/assets/xlogo.svg'

export const BlueskyIcon = ({ size = 20 }: { size?: number }) => (
    <img src={blueskyLogo} alt="Bluesky" width={size} height={size} style={{ display: 'block' }} />
)

export const XIcon = ({ size = 20 }: { size?: number }) => (
    <img src={xLogo} alt="X" width={size} height={size} style={{ display: 'block' }} />
)
