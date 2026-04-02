import './Card.css'

export default function Card({ title, description, children }) {
  return (
    <article className="card glass-panel">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="card-content">{children}</div>
    </article>
  )
}
