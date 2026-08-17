import { Link } from 'react-router-dom'
import './HomeFlowLogo.css'

function HomeFlowMark({ size = 42 }) {
  return (
    <span
      className="homeflow-logo__mark"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 48 48"
        className="homeflow-logo__svg"
        aria-hidden="true"
      >
        {/* House */}
        <path
          d="M8 22L24 8L40 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M13 20V36H35V20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />

        {/* Door */}
        <path
          d="M21 36V27H27V36"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />

        {/* Flow / leaf */}
        <path
          d="M7 39C14 35 19 38 24 39C30 41 35 39 41 34"
          fill="none"
          stroke="var(--color-secondary)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <path
          d="M33 37C36 31 40 29 43 30C42 34 39 37 33 37Z"
          fill="var(--color-secondary)"
          opacity="0.9"
        />

        {/* Window */}
        <rect
          x="18"
          y="19"
          width="5"
          height="5"
          rx="1"
          fill="var(--color-secondary)"
        />

        <rect
          x="25"
          y="19"
          width="5"
          height="5"
          rx="1"
          fill="var(--color-secondary)"
        />
      </svg>
    </span>
  )
}

function HomeFlowLogo({ to = '/', showText = true }) {
  return (
    <Link to={to} className="homeflow-logo">
      <HomeFlowMark />

      {showText && (
        <span className="homeflow-logo__text">
          <span className="homeflow-logo__name">
            Home<span>Flow</span>
          </span>

          <small>Smart Household Management</small>
        </span>
      )}
    </Link>
  )
}

export { HomeFlowMark }

export default HomeFlowLogo