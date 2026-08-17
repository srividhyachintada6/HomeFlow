import { Link } from 'react-router-dom'
import './OverviewCards.css'

function BillsOverviewCard({ count, next }) {
  return (
    <div className="overview-card">
      <p className="overview-card__label">Upcoming Bills</p>
      <p className="overview-card__value">{count} upcoming</p>

      {next && (
        <div className="overview-card__next-bill">
          <p className="overview-card__next-bill-title">{next.title}</p>
          <p className="overview-card__next-bill-meta">
            ₹{next.amount.toLocaleString('en-IN')} · Due {next.dueDate}
          </p>
        </div>
      )}

      <Link to="/dashboard/bills" className="overview-card__link">View all bills</Link>
    </div>
  )
}

export default BillsOverviewCard