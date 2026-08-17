import './PlaceholderPage.css'

function PlaceholderPage({ title, note }) {
  return (
    <div className="placeholder-page">
      <h1>{title}</h1>
      <p>{note || `${title} is coming in a later phase.`}</p>
    </div>
  )
}

export default PlaceholderPage