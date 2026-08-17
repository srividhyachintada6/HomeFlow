import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import './Expenses.css'

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
  title: '',
  amount: '',
  category: 'Food',
  expenseDate: new Date().toISOString().split('T')[0],
  description: '',
}

function Expenses() {
  const { user } = useAuth()

  const [expenses, setExpenses] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const loadExpenses = async () => {
    try {
      setLoading(true)

      const response = await fetch(
        `/api/expenses?userId=${user.id}`
      )

      if (!response.ok) {
        throw new Error('Failed to load expenses')
      }

      const data = await response.json()

      setExpenses(data)
    } catch {
      setError('Could not load your expenses.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user?.id) {
      loadExpenses()
    }
  }, [user?.id])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    if (!form.title.trim()) {
      setError('Please enter an expense name.')
      return
    }

    if (!form.amount || Number(form.amount) <= 0) {
      setError('Please enter a valid amount.')
      return
    }

    try {
      setSaving(true)

      const payload = {
        title: form.title,
        amount: Number(form.amount),
        category: form.category,
        expenseDate: form.expenseDate,
        description: form.description,
        userId: user.id,
      }

      const url = editingId
        ? `/api/expenses/${editingId}`
        : '/api/expenses'

      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to save expense')
      }

      await loadExpenses()

      setForm(emptyForm)
      setEditingId(null)
    } catch {
      setError('Could not save the expense.')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (expense) => {
    setEditingId(expense.id)

    setForm({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      expenseDate: expense.expenseDate,
      description: expense.description || '',
    })

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this expense?'
    )

    if (!confirmed) return

    try {
      const response = await fetch(
        `/api/expenses/${id}?userId=${user.id}`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        throw new Error()
      }

      setExpenses((current) =>
        current.filter((expense) => expense.id !== id)
      )
    } catch {
      setError('Could not delete the expense.')
    }
  }

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {

      const matchesSearch =
        expense.title
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesCategory =
        categoryFilter === 'All' ||
        expense.category === categoryFilter

      return matchesSearch && matchesCategory
    })
  }, [expenses, search, categoryFilter])

  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  )

  return (
    <div className="expenses-page">

      <div className="expenses-page__heading">
        <div>
          <p className="expenses-page__eyebrow">
            Household spending
          </p>

          <h1>Expenses</h1>

          <p>
            Track where your money goes and keep your spending organized.
          </p>
        </div>

        <div className="expenses-page__total">
          <span>Total spent</span>
          <strong>
            ₹{total.toLocaleString('en-IN')}
          </strong>
        </div>
      </div>

      {error && (
        <div className="expenses-page__error">
          {error}
        </div>
      )}

      <div className="expenses-page__layout">

        {/* ADD EXPENSE */}

        <section className="expense-form-card">

          <div className="expense-form-card__heading">
            <h2>
              {editingId ? 'Edit Expense' : 'Add Expense'}
            </h2>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null)
                  setForm(emptyForm)
                }}
              >
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit}>

            <div className="expense-field">
              <label>Expense name</label>

              <input
                type="text"
                name="title"
                placeholder="e.g. Groceries"
                value={form.title}
                onChange={handleChange}
              />
            </div>

            <div className="expense-form-row">

              <div className="expense-field">
                <label>Amount</label>

                <input
                  type="number"
                  name="amount"
                  placeholder="₹ 0"
                  min="1"
                  step="0.01"
                  value={form.amount}
                  onChange={handleChange}
                />
              </div>

              <div className="expense-field">
                <label>Category</label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  {CATEGORIES.map((category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            <div className="expense-field">
              <label>Date</label>

              <input
                type="date"
                name="expenseDate"
                value={form.expenseDate}
                onChange={handleChange}
              />
            </div>

            <div className="expense-field">
              <label>Description</label>

              <textarea
                name="description"
                placeholder="Optional note..."
                value={form.description}
                onChange={handleChange}
                rows="3"
              />
            </div>

            <button
              type="submit"
              className="expense-form-card__submit"
              disabled={saving}
            >
              {saving
                ? 'Saving...'
                : editingId
                  ? 'Update Expense'
                  : 'Add Expense'}
            </button>

          </form>

        </section>

        {/* EXPENSE LIST */}

        <section className="expenses-list-card">

          <div className="expenses-list-card__top">

            <div>
              <h2>Your Expenses</h2>
              <span>
                {filteredExpenses.length} records
              </span>
            </div>

            <div className="expenses-filters">

              <input
                type="search"
                placeholder="Search expenses..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              <select
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(e.target.value)
                }
              >
                <option value="All">All categories</option>

                {CATEGORIES.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>

            </div>

          </div>

          {loading ? (
            <div className="expenses-empty">
              Loading expenses...
            </div>
          ) : filteredExpenses.length === 0 ? (
            <div className="expenses-empty">
              <span>₹</span>
              <h3>No expenses yet</h3>
              <p>
                Add your first expense to start tracking your spending.
              </p>
            </div>
          ) : (

            <div className="expense-list">

              {filteredExpenses.map((expense) => (

                <div
                  className="expense-item"
                  key={expense.id}
                >

                  <div className="expense-item__icon">
                    {expense.category.charAt(0)}
                  </div>

                  <div className="expense-item__main">

                    <h3>{expense.title}</h3>

                    <p>
                      {expense.category}
                      {' · '}
                      {expense.expenseDate}
                    </p>

                    {expense.description && (
                      <small>
                        {expense.description}
                      </small>
                    )}

                  </div>

                  <div className="expense-item__right">

                    <strong>
                      ₹{Number(expense.amount).toLocaleString('en-IN')}
                    </strong>

                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(expense)
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(expense.id)
                        }
                      >
                        Delete
                      </button>
                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </div>

    </div>
  )
}

export default Expenses