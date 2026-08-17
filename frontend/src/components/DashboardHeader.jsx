import { useAuth } from '../context/AuthContext'
import './DashboardHeader.css'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

function initialsFor(name) {
  if (!name) return 'H'
  const parts = name.trim().split(/\s+/)
  return parts.slice(0, 2).map((p) => p[0].toUpperCase()).join('')
}

function DashboardHeader() {
  const { user } = useAuth()
  const displayName = user?.name

  return (
    <header className="dashboard-header">
      <div>
        <h1 className="dashboard-header__greeting">
          {getGreeting()}{displayName ? `, ${displayName}` : ''} <span aria-hidden="true">👋</span>
        </h1>
        <p className="dashboard-header__subtitle">Here&rsquo;s what&rsquo;s happening with your household today.</p>
      </div>

      <div className="dashboard-header__actions">
        <button type="button" className="dashboard-header__icon-btn" aria-label="Notifications">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.7 21a2 2 0 0 1-3.4 0" />
          </svg>
        </button>

        <div className="dashboard-header__user">
          <span className="dashboard-header__avatar">{initialsFor(displayName)}</span>
          <span className="dashboard-header__name">{displayName || 'Guest'}</span>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader