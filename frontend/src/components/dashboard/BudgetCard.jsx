import './OverviewCards.css'

function BudgetCard({ budget, spent, remaining }) {
  const percentUsed = Math.round((spent / budget) * 100)

  return (
    <div className="overview-card">
      <p className="overview-card__label">Monthly Budget</p>
      <p className="overview-card__value">₹{budget.toLocaleString('en-IN')}</p>

      <div className="overview-card__row">
        <span>Spent</span>
        <span className="overview-card__mono">₹{spent.toLocaleString('en-IN')}</span>
      </div>
      <div className="overview-card__row">
        <span>Remaining</span>
        <span className="overview-card__mono">₹{remaining.toLocaleString('en-IN')}</span>
      </div>

      <div className="overview-card__progress-track">
        <div className="overview-card__progress-fill" style={{ width: `${percentUsed}%` }} />
      </div>
      <p className="overview-card__progress-label">{percentUsed}% used</p>
    </div>
  )
}

export default BudgetCard