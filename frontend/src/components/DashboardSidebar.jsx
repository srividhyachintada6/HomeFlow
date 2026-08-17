import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import HomeFlowLogo from './HomeFlowLogo'
import { useAuth } from '../context/AuthContext'
import './DashboardSidebar.css'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: 'home', end: true },
  { to: '/dashboard/expenses', label: 'Expenses', icon: 'expenses' },
  { to: '/dashboard/budget', label: 'Budget', icon: 'budget' },
  { to: '/dashboard/bills', label: 'Bills', icon: 'bills' },
  { to: '/dashboard/grocery', label: 'Grocery List', icon: 'grocery' },
  { to: '/dashboard/insights', label: 'Insights', icon: 'insights' },
]

const SECONDARY_ITEMS = [
  { to: '/dashboard/settings', label: 'Settings', icon: 'settings' },
  { to: '/dashboard/profile', label: 'Profile', icon: 'profile' },
]

const ICON_PATHS = {
  home: 'M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9',
  expenses: 'M4 19V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14M4 19h16M8 15v-4M12 15V9M16 15v-7',
  budget: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-5v3m0 12v3m9-9h-3M6 12H3',
  grocery: 'M4 8h16l-1.5 10.5a1 1 0 0 1-1 .9H6.5a1 1 0 0 1-1-.9L4 8Zm4 0V6a4 4 0 0 1 8 0v2',
  bills: 'M6 3h9l3 3v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm3 7h6M9 13h6M9 16h4',
  insights: 'M4 19V9m6 10V4m6 15v-7m4 7H3',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7-3c0 .48-.05.94-.14 1.4l2 1.56-2 3.46-2.36-.96c-.7.62-1.52 1.1-2.4 1.4L13.7 22h-3.4l-.4-2.14a6.9 6.9 0 0 1-2.4-1.4l-2.36.96-2-3.46 2-1.56A7.03 7.03 0 0 1 5 12c0-.48.05-.94.14-1.4l-2-1.56 2-3.46 2.36.96c.7-.62 1.52-1.1 2.4-1.4L10.3 2h3.4l.4 2.14c.88.3 1.7.78 2.4 1.4l2.36-.96 2 3.46-2 1.56c.09.46.14.92.14 1.4Z',
  profile: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0',
  logout: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9',
}

function Icon({ name }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={ICON_PATHS[name]} />
    </svg>
  )
}

function NavItems({ items, onNavigate }) {
  return (
    <>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `dashboard-sidebar__item${isActive ? ' dashboard-sidebar__item--active' : ''}`
          }
        >
          <Icon name={item.icon} />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </>
  )
}

function DashboardSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <div className="dashboard-sidebar__mobile-bar">
        <HomeFlowLogo />
        <button
          type="button"
          className="dashboard-sidebar__toggle"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span /><span /><span />
        </button>
      </div>

      {mobileOpen && <div className="dashboard-sidebar__backdrop" onClick={closeMobile} />}

      <aside className={`dashboard-sidebar${mobileOpen ? ' dashboard-sidebar--open' : ''}`}>
        <div className="dashboard-sidebar__brand">
          <HomeFlowLogo />
          <p className="dashboard-sidebar__tagline">Smart Household Management</p>
        </div>

        <nav className="dashboard-sidebar__nav">
          <NavItems items={NAV_ITEMS} onNavigate={closeMobile} />
          <div className="dashboard-sidebar__divider" />
          <NavItems items={SECONDARY_ITEMS} onNavigate={closeMobile} />
        </nav>

        <button type="button" className="dashboard-sidebar__logout" onClick={handleLogout}>
          <Icon name="logout" />
          <span>Logout</span>
        </button>
      </aside>
    </>
  )
}

export default DashboardSidebar