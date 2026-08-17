import SummaryCard from '../components/SummaryCard'
import SectionCard from '../components/SectionCard'
import BackendTest from '../components/BackendTest'
import './Dashboard.css'

// TEMP_MOCK_DATA — for visual development only. Replace with real API data
// once the backend endpoints for expenses/budget/grocery/bills exist.
const SUMMARY = {
  budget: 3200,
  spent: 2140,
  remaining: 1060,
  upcomingBillsTotal: 480,
}

const SPENDING_BY_CATEGORY = [
  { category: 'Rent', amount: 1200, percent: 100 },
  { category: 'Groceries', amount: 420, percent: 35 },
  { category: 'Utilities', amount: 180, percent: 15 },
  { category: 'Transport', amount: 150, percent: 12.5 },
  { category: 'Dining', amount: 190, percent: 16 },
]

const RECENT_EXPENSES = [
  { id: 1, name: 'Whole Foods Market', category: 'Groceries', date: 'Aug 14', amount: 86.4 },
  { id: 2, name: 'Electricity Bill', category: 'Utilities', date: 'Aug 12', amount: 64.2 },
  { id: 3, name: 'Uber', category: 'Transport', date: 'Aug 11', amount: 18.5 },
  { id: 4, name: "Trader Joe's", category: 'Groceries', date: 'Aug 9', amount: 42.1 },
]

const GROCERY_LIST = [
  { id: 1, item: 'Milk', done: false },
  { id: 2, item: 'Eggs', done: false },
  { id: 3, item: 'Olive oil', done: true },
  { id: 4, item: 'Spinach', done: false },
]

const UPCOMING_BILLS = [
  { id: 1, name: 'Internet', due: 'Aug 20', amount: 60, status: 'upcoming' },
  { id: 2, name: 'Rent', due: 'Sep 1', amount: 1200, status: 'upcoming' },
  { id: 3, name: 'Phone Plan', due: 'Aug 18', amount: 35, status: 'due-soon' },
]

const currency = (n) =>
  n.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  })
function Dashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1>Good evening!</h1>
        <p>Here&rsquo;s your household overview.</p>
      </header>

      <div className="dashboard__summary-grid">
        <SummaryCard label="Monthly Budget" value={currency(SUMMARY.budget)} />
        <SummaryCard label="Total Spent" value={currency(SUMMARY.spent)} tone="accent" />
        <SummaryCard label="Remaining" value={currency(SUMMARY.remaining)} />
        <SummaryCard label="Upcoming Bills" value={currency(SUMMARY.upcomingBillsTotal)} tone="warn" />
      </div>

      <div className="dashboard__main-grid">
        <SectionCard title="Monthly Spending" action="View all">
          <div className="spending-list">
            {SPENDING_BY_CATEGORY.map((row) => (
              <div className="spending-row" key={row.category}>
                <div className="spending-row__meta">
                  <span>{row.category}</span>
                  <span className="spending-row__amount">{currency(row.amount)}</span>
                </div>
                <div className="spending-row__track">
                  <div className="spending-row__fill" style={{ width: `${row.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Recent Expenses" action="View all">
          <ul className="expense-list">
            {RECENT_EXPENSES.map((expense) => (
              <li className="expense-row" key={expense.id}>
                <div>
                  <p className="expense-row__name">{expense.name}</p>
                  <p className="expense-row__meta">{expense.category} · {expense.date}</p>
                </div>
                <span className="expense-row__amount">{currency(expense.amount)}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Grocery List" action="View all">
          <ul className="grocery-preview">
            {GROCERY_LIST.map((entry) => (
              <li
                className={`grocery-preview__item${entry.done ? ' grocery-preview__item--done' : ''}`}
                key={entry.id}
              >
                <span className="grocery-preview__dot" />
                {entry.item}
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Upcoming Bills" action="View all">
          <ul className="bills-preview">
            {UPCOMING_BILLS.map((bill) => (
              <li className="bills-preview__row" key={bill.id}>
                <div>
                  <p className="bills-preview__name">{bill.name}</p>
                  <p className="bills-preview__due">Due {bill.due}</p>
                </div>
                <div className="bills-preview__right">
                  <span className="bills-preview__amount">{currency(bill.amount)}</span>
                  <span className={`bills-preview__badge bills-preview__badge--${bill.status}`}>
                    {bill.status === 'due-soon' ? 'Due soon' : 'Upcoming'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <footer className="dashboard__debug">
        <p className="dashboard__debug-label">Backend connection (temporary — remove after UI is confirmed)</p>
        <BackendTest />
      </footer>
    </div>
  )
}

export default Dashboard