import './FeatureCard.css'

function FeatureCard({ icon, title, description, tone = 'primary' }) {
  return (
    <div className={`feature-card feature-card--${tone}`}>
      <div className="feature-card__icon">{icon}</div>
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__description">{description}</p>
    </div>
  )
}

export default FeatureCard