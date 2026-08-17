import FloatingFinanceCard from './FloatingFinanceCard'
import './HomeScene.css'

const CARDS = [
  {
    label: 'Monthly Budget',
    value: '₹32,000',
    sublabel: '68% planned',
    className: 'scene-card scene-card--budget',
  },
  {
    label: 'Expenses',
    value: '₹21,400',
    sublabel: 'This month',
    className: 'scene-card scene-card--expense',
  },
  {
    label: 'Remaining',
    value: '₹10,600',
    sublabel: 'Left to spend',
    className: 'scene-card scene-card--remaining',
  },
  {
    label: 'Grocery',
    value: '6 items',
    sublabel: '3 checked',
    className: 'scene-card scene-card--grocery',
  },
  {
    label: 'Bills',
    value: '3 due',
    sublabel: 'Next: Aug 20',
    className: 'scene-card scene-card--bills',
  },
]

function Window({ className = '' }) {
  return (
    <div className={`scene-window ${className}`}>
      <span />
      <span />
      <span />
      <span />
    </div>
  )
}

function Tree({ className = '' }) {
  return (
    <div className={`scene-tree ${className}`}>
      <div className="scene-tree__top" />
      <div className="scene-tree__middle" />
      <div className="scene-tree__bottom" />
      <div className="scene-tree__trunk" />
    </div>
  )
}

function HomeScene() {
  return (
    <div className="home-scene">

      {/* Ambient glow */}
      <div className="scene-glow scene-glow--main" />
      <div className="scene-glow scene-glow--gold" />

      {/* Decorative orbit */}
      <div className="scene-orbit scene-orbit--one">
        <span />
      </div>

      <div className="scene-orbit scene-orbit--two">
        <span />
      </div>

      {/* Floating particles */}
      <div className="scene-particles">
        {Array.from({ length: 10 }).map((_, index) => (
          <span
            key={index}
            className={`scene-particle scene-particle--${index + 1}`}
          />
        ))}
      </div>

      {/* Main 3D stage */}
      <div className="scene-stage">

        <div className="scene-shadow" />

        {/* Platform */}
        <div className="scene-platform">

          <div className="scene-platform__top">
            <div className="scene-platform__inner" />
          </div>

          <div className="scene-platform__base" />

        </div>

        {/* House */}
        <div className="smart-house">

          {/* Back wall */}
          <div className="smart-house__back" />

          {/* Main body */}
          <div className="smart-house__body">

            <div className="smart-house__front">

              <Window className="scene-window--one" />
              <Window className="scene-window--two" />

              <div className="smart-house__door">
                <span className="smart-house__door-handle" />
              </div>

              <div className="smart-house__steps">
                <span />
                <span />
              </div>

            </div>

            {/* Side wall */}
            <div className="smart-house__side">
              <Window className="scene-window--side" />
            </div>

          </div>

          {/* Roof */}
          <div className="smart-house__roof">
            <div className="smart-house__roof-main" />
            <div className="smart-house__roof-side" />
          </div>

          {/* Balcony */}
          <div className="smart-house__balcony">
            <span />
            <span />
            <span />
            <span />
          </div>

          {/* Chimney */}
          <div className="smart-house__chimney" />

        </div>

        {/* Trees */}
        <Tree className="scene-tree--left" />
        <Tree className="scene-tree--right" />

        {/* Cards */}
        {CARDS.map((card) => (
          <FloatingFinanceCard
            key={card.label}
            label={card.label}
            value={card.value}
            sublabel={card.sublabel}
            className={card.className}
          />
        ))}

        {/* Tiny floating icons */}
        <div className="scene-icon scene-icon--leaf">✦</div>
        <div className="scene-icon scene-icon--home">⌂</div>
        <div className="scene-icon scene-icon--gold">✦</div>

      </div>
    </div>
  )
}

export default HomeScene