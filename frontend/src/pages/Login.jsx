import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import { useAuth } from '../context/AuthContext'
import './Login.css'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { setUser } = useAuth()

  const justRegistered = location.state?.registered

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Login failed. Please try again.')
        setLoading(false)
        return
      }

      setUser(data.user)
      navigate('/dashboard')
    } catch {
      setError('Could not reach the server. Please make sure the backend is running.')
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <h1 className="auth-card__heading">Welcome back</h1>
      <p className="auth-card__subtitle">Your household, right where you left it.</p>

      {justRegistered && <p className="auth-success">Account created — sign in to continue.</p>}
      {error && <p className="auth-error">{error}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" placeholder="you@example.com" autoComplete="email" value={form.email} onChange={handleChange} required />
        </div>

        <div className="auth-field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" placeholder="Your password" autoComplete="current-password" value={form.password} onChange={handleChange} required />
          <a href="#" className="auth-forgot" onClick={(e) => e.preventDefault()}>Forgot password?</a>
        </div>

        <button type="submit" className="auth-submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      <p className="auth-switch">
        Don&rsquo;t have an account? <Link to="/register">Create account</Link>
      </p>
    </AuthLayout>
  )
}

export default Login