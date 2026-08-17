import { useState } from 'react'
import './QuickActions.css'

const ACTIONS = ['+ Add Expense', '+ Add Bill', '+ Add Grocery Item', 'Set Budget']

function QuickActions() {
  const [message, setMessage] = useState('')

  const handleClick = (label) => {
    // TODO: open the real form/modal for this action in a later phase.
    setMessage(`"${label}" will open a form in a later phase.`)
    setTimeout(() => setMessage(''), 2500)
  }

  return (
    <div className="quick-actions">
      {ACTIONS.map((action) => (
        <button key={action} type="button" className="quick-actions__btn" onClick={() => handleClick(action)}>
          {action}
        </button>
      ))}
      {message && <p className="quick-actions__message">{message}</p>}
    </div>
  )
}

export default QuickActions