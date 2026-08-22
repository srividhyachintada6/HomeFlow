import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import './Register.css'

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Registration failed. Please try again.')
        setLoading(false)
        return
      }

      navigate('/login', { state: { registered: true } })
    } catch {
      setError('Could not reach the server. Please make sure the backend is running.')
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <h1 className="auth-card__heading">Create your HomeFlow</h1>
      <p className="auth-card__subtitle">Start managing your household with clarity.</p>

      {error && <p className="auth-error">{error}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="name">Full Name</label>
          <input id="name" type="text" name="name" placeholder="Your name" autoComplete="name" value={form.name} onChange={handleChange} required />
        </div>

        <div className="auth-field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" placeholder="you@example.com" autoComplete="email" value={form.email} onChange={handleChange} required />
        </div>

        <div className="auth-field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" placeholder="Create a password" autoComplete="new-password" value={form.password} onChange={handleChange} required minLength={6} />
        </div>

        <div className="auth-field">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input id="confirmPassword" type="password" name="confirmPassword" placeholder="Re-enter your password" autoComplete="new-password" value={form.confirmPassword} onChange={handleChange} required />
        </div>

        <button type="submit" className="auth-submit" disabled={loading}>
          {loading ? 'Creating account…' : 'Create Account'}
        </button>
      </form>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </AuthLayout>
  )
}

export default Register