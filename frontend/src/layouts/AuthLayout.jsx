import HomeFlowLogo from '../components/HomeFlowLogo'
import FloatingFinanceScene from '../components/FloatingFinanceScene'
import './AuthLayout.css'

const AUTH_SCENE_CARDS = [
  { label: 'Monthly Budget', value: '₹32,000' },
  { label: 'Spent', value: '₹21,400' },
  { label: 'Bills', value: '3 Upcoming' },
]

function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      <div className="auth-layout__visual">
        <div className="auth-layout__visual-top">
          <HomeFlowLogo />
        </div>
        <FloatingFinanceScene cards={AUTH_SCENE_CARDS} variant="auth" />
        <p className="auth-layout__visual-caption">A calmer way to manage your home.</p>
      </div>

      <div className="auth-layout__panel">
        <div className="auth-layout__panel-inner">
          <div className="auth-layout__mobile-logo">
            <HomeFlowLogo />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout