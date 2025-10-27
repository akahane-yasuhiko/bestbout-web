import { NavLink } from 'react-router-dom'


const linkStyle: React.CSSProperties = { marginRight: 12 }


export default function NavBar() {
    return (
        <nav style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <strong>BestBout</strong>
            <NavLink to="/" style={linkStyle}>Home</NavLink>
            <NavLink to="/cards" style={linkStyle}>Cards</NavLink>
            <NavLink to="/rankings" style={linkStyle}>Rankings</NavLink>
        </nav>
    )
}