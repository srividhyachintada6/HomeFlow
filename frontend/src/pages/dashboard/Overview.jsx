import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import SummaryCard from '../../components/SummaryCard'
import SectionCard from '../../components/SectionCard'
import BudgetCard from '../../components/dashboard/BudgetCard'
import BillsOverviewCard from '../../components/dashboard/BillsOverviewCard'
import GroceryOverviewCard from '../../components/dashboard/GroceryOverviewCard'

import './Overview.css'

const currency = (n) =>
  `₹${Number(n || 0).toLocaleString('en-IN')}`

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

function Overview() {
  const { user } = useAuth()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadDashboard = async () => {
    if (!user?.id) return

    try {
      setLoading(true)
      setError('')

      const response = await fetch(
        `http://localhost:8080/api/dashboard/user/${user.id}`
      )

      if (!response.ok) {
        throw new Error('Failed to load dashboard')
      }

      const dashboardData = await response.json()
      setData(dashboardData)
    } catch (err) {
      console.error(err)

      setError(
        'Could not load your dashboard. Please make sure the backend is running.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [user?.id])

  if (loading) {
    return (
      <div className="overview">
        <div className="overview__loading">
          <div className="overview__loading-orb">
            <span />
          </div>

          <p>Preparing your financial overview...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="overview">
        <div className="overview__error">
          <div className="overview__error-icon">!</div>

          <h3>Dashboard unavailable</h3>

          <p>{error}</p>

          <button
            className="overview__retry-btn"
            onClick={loadDashboard}
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  if (!data) return null

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  const salary = Number(data.monthlySalary || 0)
  const expenses = Number(data.totalExpenses || 0)
  const remaining = Number(data.remainingSalary || 0)
  const totalBudget = Number(data.totalBudgeted || 0)

  const hasSalary = salary > 0
  const remainingIsNegative = remaining < 0

  const expensePercentage =
    salary > 0
      ? Math.min(Math.round((expenses / salary) * 100), 100)
      : 0

  const remainingPercentage =
    salary > 0
      ? Math.max(
          0,
          Math.min(Math.round((remaining / salary) * 100), 100)
        )
      : 0

  const categoryBudgets = data.categoryBudgets || []
  const recentExpenses = data.recentExpenses || []

  const firstName = user?.name
    ? user.name.split(' ')[0]
    : 'there'

  const initials = getInitials(user?.name || 'HF')

  return (
    <div className="overview">

      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div className="overview__ambient overview__ambient--one" />
      <div className="overview__ambient overview__ambient--two" />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="overview__header">

  <div className="overview__welcome">

    <span className="overview__eyebrow">
      HOMEFLOW • FINANCIAL OVERVIEW
    </span>

    <h1 className="overview__greeting">
      Your {new Date().toLocaleDateString('en-IN', {
        month: 'long'
      })} overview
      <span className="overview__greeting-dot">.</span>
    </h1>

    <p className="overview__date">
      {today} <span>•</span> Here's where your money stands today.
    </p>

  </div>

  <div className="overview__profile-mini">

    <div className="overview__profile-avatar">
      {initials}
    </div>

    <div>
      <span>Current month</span>

      <strong>
        {new Date().toLocaleDateString('en-IN', {
          month: 'long',
          year: 'numeric',
        })}
      </strong>
    </div>

  </div>

</header>
      {/* =====================================================
          SALARY HERO
      ===================================================== */}

      <section className="overview__hero">

        <div className="overview__hero-content">

          <div className="overview__hero-label">
            <span className="overview__live-dot" />
            MONTHLY INCOME
          </div>

          <div className="overview__hero-title-row">

            <div>

              <h2 className="overview__salary">
                {currency(salary)}
              </h2>

              <p className="overview__salary-caption">
                Your available monthly salary
              </p>

            </div>

            <Link
              to="/dashboard/profile"
              className="overview__salary-edit"
            >
              <span>✦</span>
              Manage income
            </Link>

          </div>

          <div className="overview__hero-stats">

            <div className="overview__hero-stat">
              <span>Spent</span>
              <strong>{currency(expenses)}</strong>
            </div>

            <div className="overview__hero-divider" />

            <div className="overview__hero-stat">
              <span>Remaining</span>
              <strong
                className={
                  remainingIsNegative
                    ? 'overview__negative'
                    : ''
                }
              >
                {currency(remaining)}
              </strong>
            </div>

            <div className="overview__hero-divider" />

            <div className="overview__hero-stat">
              <span>Budgeted</span>
              <strong>{currency(totalBudget)}</strong>
            </div>

          </div>

          <div className="overview__hero-progress">

            <div className="overview__hero-progress-head">
              <span>Income usage</span>
              <strong>{expensePercentage}%</strong>
            </div>

            <div className="overview__hero-track">
              <div
                className={`overview__hero-fill ${
                  remainingIsNegative
                    ? 'overview__hero-fill--danger'
                    : ''
                }`}
                style={{
                  width: `${expensePercentage}%`,
                }}
              />
            </div>

            <p>
              {remainingIsNegative
                ? 'You have exceeded your monthly income.'
                : `${remainingPercentage}% of your salary is still available.`}
            </p>

          </div>

        </div>

        {/* 3D MONEY ORB */}

        <div className="overview__money-orb">

          <div className="overview__orb-ring overview__orb-ring--one" />
          <div className="overview__orb-ring overview__orb-ring--two" />

          <div className="overview__orb-core">

            <span>AVAILABLE</span>

            <strong>
              {remainingPercentage}%
            </strong>

            <small>
              income left
            </small>

          </div>

        </div>

      </section>

      {/* =====================================================
          NO SALARY NUDGE
      ===================================================== */}

      {!hasSalary && (
        <div className="overview__nudge">

          <div className="overview__nudge-icon">
            ₹
          </div>

          <div>
            <strong>Set your monthly salary</strong>

            <p>
              Add your salary so HomeFlow can automatically
              calculate your remaining income and budget health.
            </p>
          </div>

          <Link to="/dashboard/profile">
            Add salary →
          </Link>

        </div>
      )}

      {/* =====================================================
          WARNING
      ===================================================== */}

      {data.budgetWarning && (
        <div className="overview__warning">

          <span className="overview__warning-icon">
            !
          </span>

          <div>
            <strong>Budget attention needed</strong>
            <p>{data.budgetWarning}</p>
          </div>

        </div>
      )}

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <section className="overview__summary-section">

        <div className="overview__section-heading">

          <div>
            <span>YOUR MONEY</span>
            <h2>Financial snapshot</h2>
          </div>

          <span className="overview__section-line" />

        </div>

        <div className="overview__summary-grid">

          <div className="overview__lift">
            <SummaryCard
              label="Monthly Salary"
              value={currency(salary)}
              tone="accent"
            />
          </div>

          <div className="overview__lift overview__lift--delay">
            <SummaryCard
              label="Total Expenses"
              value={currency(expenses)}
            />
          </div>

          <div className="overview__lift overview__lift--delay-2">
            <SummaryCard
              label="Remaining Salary"
              value={currency(remaining)}
              tone={
                remainingIsNegative
                  ? 'warn'
                  : undefined
              }
              sublabel={
                remainingIsNegative
                  ? 'Over your monthly income'
                  : 'Available to spend'
              }
              trend={
                remainingIsNegative
                  ? 'up'
                  : undefined
              }
            />
          </div>

          <div className="overview__lift overview__lift--delay-3">
            <BudgetCard
              budget={totalBudget}
              spent={expenses}
              remaining={totalBudget - expenses}
            />
          </div>

        </div>

      </section>

      {/* =====================================================
          SECONDARY CARDS
      ===================================================== */}

      <section className="overview__secondary-grid">

        <div className="overview__feature-card">
          <BillsOverviewCard
            count={data.upcomingBillsCount || 0}
            next={
              data.nextBill
                ? {
                    title: data.nextBill.title,
                    amount: data.nextBill.amount,
                    dueDate: data.nextBill.dueDate,
                  }
                : null
            }
          />
        </div>

        <div className="overview__feature-card overview__feature-card--green">
          <GroceryOverviewCard
            total={data.groceryTotalCount || 0}
            purchased={data.groceryPurchasedCount || 0}
          />
        </div>

      </section>

      {/* =====================================================
          CATEGORY BUDGETS
      ===================================================== */}

      <SectionCard
        title="Where your money goes"
        action={
  <Link
    to="/dashboard/budget"
    className="overview__action-btn overview__action-btn--gold"
  >
    Manage Budget <span>→</span>
  </Link>
}
      >

        {categoryBudgets.length === 0 ? (

          <div className="overview__empty-state">

            <div className="overview__empty-icon">
              ◌
            </div>

            <h3>No budgets yet</h3>

            <p>
              Create category budgets to see exactly
              where your money is going.
            </p>

            <Link to="/dashboard/budget">
              Create your first budget →
            </Link>

          </div>

        ) : (

          <div className="overview__category-grid">

            {categoryBudgets.map((row, index) => {

              const percentage = Number(
                row.percentage || 0
              )

              const pct = Math.min(
                percentage,
                100
              )

              const over = percentage > 100

              return (
                <div
                  className={`overview__category-card ${
                    over
                      ? 'overview__category-card--over'
                      : ''
                  }`}
                  key={row.category}
                >

                  <div className="overview__category-top">

                    <div className="overview__category-number">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <div>
                      <h3>{row.category}</h3>

                      <span>
                        {over
                          ? 'Budget exceeded'
                          : `${Math.round(percentage)}% used`}
                      </span>
                    </div>

                  </div>

                  <div className="overview__category-money">

                    <strong>
                      {currency(row.spent)}
                    </strong>

                    <span>
                      / {currency(row.budgeted)}
                    </span>

                  </div>

                  <div className="overview__category-track">

                    <div
                      className={`overview__category-fill ${
                        over
                          ? 'overview__category-fill--over'
                          : ''
                      }`}
                      style={{
                        width: `${pct}%`,
                      }}
                    />

                  </div>

                </div>
              )
            })}

          </div>

        )}

      </SectionCard>

      {/* =====================================================
          RECENT + BILLS
      ===================================================== */}

      <div className="overview__main-grid">

        <SectionCard
          title="Recent Expenses"
          action={
  <Link
    to="/dashboard/expenses"
    className="overview__action-btn"
  >
    View Expenses <span>→</span>
  </Link>
}
        >

          {recentExpenses.length === 0 ? (

            <div className="overview__empty-small">
              No expenses recorded yet.
            </div>

          ) : (

            <ul className="overview__transaction-list">

              {recentExpenses.map((tx, index) => (

                <li
                  className="overview__transaction-row"
                  key={tx.id}
                >

                  <div className="overview__transaction-left">

                    <div className="overview__transaction-icon">
                      {index === 0
                        ? '↗'
                        : '₹'}
                    </div>

                    <div>

                      <p className="overview__transaction-name">
                        {tx.title}
                      </p>

                      <p className="overview__transaction-meta">
                        {tx.category} · {tx.expenseDate}
                      </p>

                    </div>

                  </div>

                  <span className="overview__transaction-amount">
                    -{currency(tx.amount)}
                  </span>

                </li>

              ))}

            </ul>

          )}

        </SectionCard>

        <SectionCard
          title="Upcoming Bills"
          action={
  <Link
    to="/dashboard/bills"
    className="overview__action-btn"
  >
    View Bills <span>→</span>
  </Link>
}
        >

          {!data.nextBill ? (

            <div className="overview__empty-state overview__empty-state--compact">

              <div className="overview__empty-icon">
                ✓
              </div>

              <h3>All caught up</h3>

              <p>
                You don't have any upcoming bills.
              </p>

            </div>

          ) : (

            <div className="overview__bill-feature">

              <div className="overview__bill-icon">
                ₹
              </div>

              <div className="overview__bill-info">

                <span>NEXT PAYMENT</span>

                <h3>
                  {data.nextBill.title}
                </h3>

                <p>
                  Due {data.nextBill.dueDate}
                </p>

              </div>

              <div className="overview__bill-price">

                <strong>
                  {currency(data.nextBill.amount)}
                </strong>

                <span className="overview__bills-badge overview__bills-badge--upcoming">
                  {data.upcomingBillsCount > 1
                    ? `+${data.upcomingBillsCount - 1} more`
                    : 'Next due'}
                </span>

              </div>

            </div>

          )}

        </SectionCard>

      </div>

      

    </div>
  )
}

export default Overview