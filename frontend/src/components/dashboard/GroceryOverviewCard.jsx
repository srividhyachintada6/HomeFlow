import { Link } from 'react-router-dom'
import './OverviewCards.css'

function GroceryOverviewCard({ total, purchased }) {
  return (
    <div className="overview-card">
      <p className="overview-card__label">Grocery</p>
      <p className="overview-card__value">{total} items</p>
      <p className="overview-card__sub">{purchased} purchased</p>

      <Link to="/dashboard/grocery" className="overview-card__button">View Grocery List</Link>
    </div>
  )
}

export default GroceryOverviewCard