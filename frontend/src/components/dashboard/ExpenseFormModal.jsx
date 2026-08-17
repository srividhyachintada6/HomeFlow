import { useState } from 'react'
import './ExpenseFormModal.css'

const CATEGORIES = ['FOOD', 'BILLS', 'TRANSPORT', 'SHOPPING', 'ENTERTAINMENT', 'HEALTH', 'OTHER']

const CATEGORY_LABELS = {
  FOOD: 'Food',
  BILLS: 'Bills',
  TRANSPORT: 'Transport',
  SHOPPING: 'Shopping',
  ENTERTAINMENT: 'Entertainment',
  HEALTH: 'Health',
  OTHER: 'Other',
}

function ExpenseFormModal({ initialExpense, onClose, onSubmit, submitting }) {
  const [form, setForm] = useState({
    title: initialExpense?.title || '',
    amount: initialExpense?.amount ?? '',
    category: initialExpense?.category || 'FOOD',
    date: initialExpense?.date || new Date().toISOString().slice(0, 10),
    description: initialExpense?.description || '',
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.amount || Number(form.amount) <= 0) {
      setError('Please enter a title and a valid amount.')
      return
    }
    setError('')
    onSubmit({ ...form, amount: Number(form.amount) })
  }

  return (
    <div className="expense-modal__backdrop" onClick={onClose}>
      <div className="expense-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="expense-modal__title">{initialExpense ? 'Edit Expense' : 'Add Expense'}</h2>

        {error && <p className="expense-modal__error">{error}</p>}

        <form className="expense-modal__form" onSubmit={handleSubmit}>
          <div className="expense-modal__field">
            <label htmlFor="title">Title</label>
            <input id="title" name="title" type="text" value={form.title} onChange={handleChange} placeholder="e.g. Groceries" />
          </div>

          <div className="expense-modal__row">
            <div className="expense-modal__field">
              <label htmlFor="amount">Amount (₹)</label>
              <input id="amount" name="amount" type="number" min="0" step="0.01" value={form.amount} onChange={handleChange} placeholder="0.00" />
            </div>

            <div className="expense-modal__field">
              <label htmlFor="date">Date</label>
              <input id="date" name="date" type="date" value={form.date} onChange={handleChange} />
            </div>
          </div>

          <div className="expense-modal__field">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={form.category} onChange={handleChange}>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{CATEGORY_LABELS[cat]}</option>
              ))}
            </select>
          </div>

          <div className="expense-modal__field">
            <label htmlFor="description">Description (optional)</label>
            <input id="description" name="description" type="text" value={form.description} onChange={handleChange} placeholder="Add a note" />
          </div>

          <div className="expense-modal__actions">
            <button type="button" className="expense-modal__cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="expense-modal__submit" disabled={submitting}>
              {submitting ? 'Saving…' : initialExpense ? 'Save Changes' : 'Add Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export { CATEGORIES, CATEGORY_LABELS }
export default ExpenseFormModal