import { NavLink } from 'react-router-dom'


export default function NavBar() {
    return (
        <header className="app-header">
            <div className="app-header-inner">
                <div className="app-logo">BestBout</div>
                <nav className="app-nav">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/cards">Cards</NavLink>
                    <NavLink to="/rankings">Rankings</NavLink>
                </nav>
            </div>
        </header>
    )
}