import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'


export default function App() {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '16px' }}>
      <NavBar />
      <Outlet />
    </div>
  )
}