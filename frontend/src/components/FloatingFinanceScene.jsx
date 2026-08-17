import './FloatingFinanceScene.css'

function HouseIcon() {
  return (
    <svg viewBox="0 0 64 64" className="scene__house-icon" aria-hidden="true">
      <path d="M8 30 32 10l24 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 26v26a2 2 0 0 0 2 2h32a2 2 0 0 0 2-2V26" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="27" y="38" width="10" height="16" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  )
}

function FloatingFinanceScene({ cards, variant = 'hero' }) {
  return (
    <div className={`scene scene--${variant}`}>
      <div className="scene__backdrop" aria-hidden="true">
        <span className="scene__blob scene__blob--1" />
        <span className="scene__blob scene__blob--2" />
        <span className="scene__grid" />
      </div>

      <div className="scene__stage">
        <div className="scene__house">
          <HouseIcon />
        </div>

        {cards.map((card, index) => (
          <div className={`scene__card scene__card--${index + 1}`} key={card.label}>
            <p className="scene__card-label">{card.label}</p>
            <p className="scene__card-value">{card.value}</p>
            {card.sublabel && <p className="scene__card-sublabel">{card.sublabel}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FloatingFinanceScene