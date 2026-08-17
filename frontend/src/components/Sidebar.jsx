import './Sidebar.css'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home' },
  { id: 'expenses', label: 'Expenses', icon: 'expenses' },
  { id: 'budget', label: 'Budget', icon: 'budget' },
  { id: 'grocery', label: 'Grocery', icon: 'grocery' },
  { id: 'inventory', label: 'Inventory', icon: 'inventory' },
  { id: 'bills', label: 'Bills', icon: 'bills' },
  { id: 'reports', label: 'Reports', icon: 'reports' },
]

const ICON_PATHS = {
  home: 'M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9',
  expenses: 'M4 19V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14M4 19h16M8 15v-4M12 15V9M16 15v-7',
  budget: 'M12 3v3M12 18v3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M3 12h3M18 12h3M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z',
  grocery: 'M4 8h16l-1.5 10.5a1 1 0 0 1-1 .9H6.5a1 1 0 0 1-1-.9L4 8Zm4 0V6a4 4 0 0 1 8 0v2',
  inventory: 'M4 7l8-4 8 4-8 4-8-4Zm0 0v10l8 4m0-14v14m8-14v10l-8 4',
  bills: 'M6 3h9l3 3v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm3 7h6M9 13h6M9 16h4',
  reports: 'M4 19V9m6 10V4m6 15v-7m4 7H3',
}

function Icon({ name }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={ICON_PATHS[name]} />
    </svg>
  )
}

function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__brand-mark">H</span>
        <span className="sidebar__brand-name">HomeFlow</span>
      </div>

      <nav className="sidebar__nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`sidebar__nav-item${activePage === item.id ? ' sidebar__nav-item--active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar__footer">
        <p className="sidebar__footer-text">Household finance,<br />kept simple.</p>
      </div>
    </aside>
  )
}

export default Sidebar