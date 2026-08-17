import './SummaryCard.css'

function SummaryCard({ label, value, sublabel, tone = 'default', trend }) {
  return (
    <div className={`summary-card summary-card--${tone}`}>
      <p className="summary-card__label">{label}</p>
      <p className="summary-card__value">{value}</p>
      {sublabel && (
        <p className={`summary-card__sublabel${trend ? ` summary-card__sublabel--${trend}` : ''}`}>
          {sublabel}
        </p>
      )}
    </div>
  )
}

export default SummaryCard