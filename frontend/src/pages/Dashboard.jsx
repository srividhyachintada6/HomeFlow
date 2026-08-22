import { useEffect, useState } from 'react'
import SummaryCard from '../components/SummaryCard'
import SectionCard from '../components/SectionCard'
import BackendTest from '../components/BackendTest'
import './Dashboard.css'

// TEMP_MOCK_DATA — for visual development only. Replace with real API data
// once the backend endpoints for expenses/budget/grocery/bills exist.


const SPENDING_BY_CATEGORY = [
  { category: 'Rent', amount: 1200, percent: 100 },
  { category: 'Groceries', amount: 420, percent: 35 },
  { category: 'Utilities', amount: 180, percent: 15 },
  { category: 'Transport', amount: 150, percent: 12.5 },
  { category: 'Dining', amount: 190, percent: 16 },
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
  const [expenses, setExpenses] = useState([])
const [budget, setBudget] = useState(0)
  useEffect(() => {
  fetch('http://localhost:8080/api/expenses?userId=1')
    .then((response) => response.json())
    .then((data) => setExpenses(data))
    .catch((error) => console.error('Failed to load expenses:', error))

  fetch('http://localhost:8080/api/budgets/user/1')
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        setBudget(data[0].amount)
      }
    })
    .catch((error) => console.error('Failed to load budget:', error))
}, [])
const SUMMARY = {
  budget: budget,
  spent: expenses.reduce((total, expense) => total + expense.amount, 0),
  remaining: budget - expenses.reduce((total, expense) => total + expense.amount, 0),
  upcomingBillsTotal: 480,
}
const spendingByCategory = expenses.reduce((result, expense) => {
  const category = expense.category || 'Other'

  if (!result[category]) {
    result[category] = 0
  }

  result[category] += expense.amount

  return result
}, {})
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
            {Object.entries(spendingByCategory).map(([category, amount]) => (
              <div className="spending-row" key={category}>
                <div className="spending-row__meta">
                  <span>{category}</span>
                  <span className="spending-row__amount">{currency(amount)}</span>
                </div>
                <div className="spending-row__track">
                  <div className="spending-row__fill" style={{ width: '100%' }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Recent Expenses" action="View all">
          <ul className="expense-list">
            {expenses.map((expense) => (
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