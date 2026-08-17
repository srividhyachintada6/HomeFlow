import './FloatingFinanceCard.css'

function FloatingFinanceCard({ label, value, sublabel, className = '' }) {
  return (
    <div className={`ffc ${className}`}>
      <p className="ffc__label">{label}</p>
      <p className="ffc__value">{value}</p>
      {sublabel && <p className="ffc__sublabel">{sublabel}</p>}
    </div>
  )
}

export default FloatingFinanceCard