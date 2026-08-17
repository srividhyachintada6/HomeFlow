import { useState } from 'react'
import { Link } from 'react-router-dom'
import HomeFlowLogo from './HomeFlowLogo'
import './Navbar.css'

const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#why-homeflow', label: 'Why HomeFlow' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#pricing', label: 'Pricing' },
]

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="navbar__row">
        <HomeFlowLogo />

        <nav className="navbar__links navbar__links--desktop">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="navbar__link">{link.label}</a>
          ))}
        </nav>

        <div className="navbar__actions navbar__actions--desktop">
          <Link to="/login" className="navbar__signin">Sign In</Link>
          <Link to="/register" className="navbar__cta">Get Started</Link>
        </div>

        <button
          type="button"
          className="navbar__toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span /><span /><span />
        </button>
      </div>

      {open && (
        <div className="navbar__mobile">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="navbar__mobile-link" onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <div className="navbar__mobile-actions">
            <Link to="/login" className="navbar__signin" onClick={() => setOpen(false)}>Sign In</Link>
            <Link to="/register" className="navbar__cta" onClick={() => setOpen(false)}>Get Started</Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar