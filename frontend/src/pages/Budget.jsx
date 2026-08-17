import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './Budget.css'

const CATEGORIES = [
  'Food',
  'Bills',
  'Transport',
  'Shopping',
  'Entertainment',
  'Health',
  'Education',
  'Other',
]

const emptyForm = {
  category: 'Food',
  amount: '',
  startDate: '',
  endDate: '',
}

function Budget() {
  const { user } = useAuth()

  const [budgets, setBudgets] = useState([])
  const [expenses, setExpenses] = useState([])

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [form, setForm] = useState(emptyForm)

  const loadData = async () => {
    if (!user?.id) return

    try {
      setLoading(true)
      setError('')

      const [budgetResponse, expenseResponse] = await Promise.all([
        fetch(`http://localhost:8080/api/budgets/user/${user.id}`),
        fetch(`http://localhost:8080/api/expenses?userId=${user.id}`),
      ])

      if (!budgetResponse.ok) {
        throw new Error('Failed to load budgets')
      }

      if (!expenseResponse.ok) {
        throw new Error('Failed to load expenses')
      }

      const budgetData = await budgetResponse.json()
      const expenseData = await expenseResponse.json()

      setBudgets(budgetData)
      setExpenses(expenseData)
    } catch (err) {
      console.error(err)
      setError('Unable to load budget information.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [user?.id])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const openCreateModal = () => {
    setEditingId(null)
    setForm({
      ...emptyForm,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
    })
    setShowModal(true)
  }

  const openEditModal = (budget) => {
    setEditingId(budget.id)

    setForm({
      category: budget.category || 'Food',
      amount: budget.amount || '',
      startDate: budget.startDate || '',
      endDate: budget.endDate || '',
    })

    setShowModal(true)
  }

  const closeModal = () => {
    if (saving) return

    setShowModal(false)
    setEditingId(null)
    setForm(emptyForm)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.amount || Number(form.amount) <= 0) {
      setError('Please enter a valid budget amount.')
      return
    }

    if (!form.startDate || !form.endDate) {
      setError('Please select the budget period.')
      return
    }

    if (new Date(form.endDate) < new Date(form.startDate)) {
      setError('End date cannot be before start date.')
      return
    }

    try {
      setSaving(true)
      setError('')

      const payload = {
        amount: Number(form.amount),
        category: form.category,
        startDate: form.startDate,
        endDate: form.endDate,
      }

      const url = editingId
        ? `http://localhost:8080/api/budgets/${editingId}`
        : `http://localhost:8080/api/budgets/user/${user.id}`

      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to save budget')
      }

      await loadData()

      closeModal()
    } catch (err) {
      console.error(err)
      setError('Could not save the budget.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this budget?'
    )

    if (!confirmed) return

    try {
      const response = await fetch(
        `http://localhost:8080/api/budgets/${id}`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        throw new Error('Failed to delete budget')
      }

      await loadData()
    } catch (err) {
      console.error(err)
      setError('Could not delete the budget.')
    }
  }

  const getSpentAmount = (budget) => {
    return expenses
      .filter((expense) => {
        if (expense.category !== budget.category) return false

        if (!expense.expenseDate) return false

        return (
          expense.expenseDate >= budget.startDate &&
          expense.expenseDate <= budget.endDate
        )
      })
      .reduce((total, expense) => total + Number(expense.amount || 0), 0)
  }

  const getBudgetStats = (budget) => {
    const spent = getSpentAmount(budget)
    const amount = Number(budget.amount || 0)

    const remaining = amount - spent

    const percentage =
      amount > 0 ? Math.round((spent / amount) * 100) : 0

    let status = 'Healthy'
    let statusClass = 'healthy'

    if (percentage > 100) {
      status = 'Over Budget'
      statusClass = 'danger'
    } else if (percentage >= 90) {
      status = 'Almost Exceeded'
      statusClass = 'danger'
    } else if (percentage >= 70) {
      status = 'Approaching Limit'
      statusClass = 'warning'
    }

    return {
      spent,
      remaining,
      percentage,
      status,
      statusClass,
    }
  }

  const summary = useMemo(() => {
    const totalBudget = budgets.reduce(
      (sum, budget) => sum + Number(budget.amount || 0),
      0
    )

    const totalSpent = budgets.reduce(
      (sum, budget) => sum + getSpentAmount(budget),
      0
    )

    return {
      totalBudget,
      totalSpent,
      remaining: totalBudget - totalSpent,
      count: budgets.length,
    }
  }, [budgets, expenses])

  return (
    <div className="budget-page">
      <div className="budget-header">
        <div>
          <p className="budget-small-title">HOMEFLOW</p>
          <h1>Budgets</h1>
          <p className="budget-subtitle">Set and manage your household spending limits.</p>
        </div>
        <button className="add-budget-btn" onClick={openCreateModal}>+ Add Budget</button>
      </div>

      {error && <p className="budget-error">{error}</p>}

      <div className="budget-summary-grid">
        <div className="budget-summary-card">
          <p>Total Budget</p>
          <h2>₹{summary.totalBudget.toLocaleString('en-IN')}</h2>
        </div>
        <div className="budget-summary-card">
          <p>Total Spent</p>
          <h2>₹{summary.totalSpent.toLocaleString('en-IN')}</h2>
        </div>
        <div className="budget-summary-card">
          <p>Remaining</p>
          <h2>₹{summary.remaining.toLocaleString('en-IN')}</h2>
        </div>
        <div className="budget-summary-card">
          <p>Budgets</p>
          <h2>{summary.count}</h2>
        </div>
      </div>

      {loading ? (
        <p className="budget-loading">Loading your budgets...</p>
      ) : budgets.length === 0 ? (
        <div className="budget-empty">
          <div className="budget-empty-icon">🎯</div>
          <h3>No budgets yet</h3>
          <p>Create your first monthly budget to start tracking your household spending.</p>
          <button className="add-budget-btn" onClick={openCreateModal}>+ Create Budget</button>
        </div>
      ) : (
        <div className="budget-grid">
          {budgets.map((budget) => {
            const stats = getBudgetStats(budget)
            return (
              <div className="budget-card" key={budget.id}>
                <div className="budget-card-top">
                  <h3>{budget.category}</h3>
                  <div className="budget-card-actions">
                    <button onClick={() => openEditModal(budget)}>Edit</button>
                    <button onClick={() => handleDelete(budget.id)}>Delete</button>
                  </div>
                </div>
                <p className="budget-card-spent">₹{stats.spent.toLocaleString('en-IN')} spent of ₹{Number(budget.amount).toLocaleString('en-IN')}</p>
                <div className="budget-card-track">
                  <div
                    className={`budget-card-fill budget-card-fill--${stats.statusClass}`}
                    style={{ width: `${Math.min(stats.percentage, 100)}%` }}
                  />
                </div>
                <div className="budget-card-row">
                  <span>{stats.percentage}% used</span>
                  <span>Remaining ₹{stats.remaining.toLocaleString('en-IN')}</span>
                </div>
                <p className="budget-card-dates">{budget.startDate} – {budget.endDate}</p>
                <span className={`budget-card-status budget-card-status--${stats.statusClass}`}>{stats.status}</span>
              </div>
            )
          })}
        </div>
      )}

      {showModal && (
        <div className="budget-modal-backdrop" onClick={closeModal}>
          <div className="budget-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingId ? 'Edit Budget' : 'Create Budget'}</h2>

            <form onSubmit={handleSubmit}>
              <div className="budget-form-group">
                <label>Category</label>
                <select name="category" value={form.category} onChange={handleChange}>
                  {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div className="budget-form-group">
                <label>Monthly Budget Amount</label>
                <input type="number" name="amount" value={form.amount} onChange={handleChange} min="0" step="1" />
              </div>

              <div className="budget-form-group">
                <label>Start Date</label>
                <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
              </div>

              <div className="budget-form-group">
                <label>End Date</label>
                <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
              </div>

              <div className="budget-modal-actions">
                <button type="button" onClick={closeModal} disabled={saving}>Cancel</button>
                <button type="submit" disabled={saving}>{saving ? 'Saving…' : editingId ? 'Save Changes' : 'Create Budget'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Budget