import './SectionCard.css'

function SectionCard({ title, action, children }) {
  return (
    <section className="section-card">
      <div className="section-card__header">
        <h2 className="section-card__title">{title}</h2>
        {action && <span className="section-card__action">{action}</span>}
      </div>
      <div className="section-card__body">{children}</div>
    </section>
  )
}

export default SectionCard