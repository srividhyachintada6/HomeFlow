import { useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import Dashboard from './Dashboard'

const PAGE_LABELS = {
  dashboard: 'Dashboard',
  expenses: 'Expenses',
  budget: 'Budget',
  grocery: 'Grocery',
  inventory: 'Inventory',
  bills: 'Bills',
  reports: 'Reports',
}

function ComingSoon({ page }) {
  return (
    <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--color-text-muted)' }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 8, color: 'var(--color-text)' }}>
        {PAGE_LABELS[page]}
      </p>
      <p>This page is coming soon.</p>
    </div>
  )
}

function DashboardApp() {
  const [activePage, setActivePage] = useState('dashboard')

  return (
    <MainLayout activePage={activePage} onNavigate={setActivePage}>
      {activePage === 'dashboard' ? <Dashboard /> : <ComingSoon page={activePage} />}
    </MainLayout>
  )
}

export default DashboardApp