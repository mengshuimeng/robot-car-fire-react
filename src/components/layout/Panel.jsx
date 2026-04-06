export default function Panel({ title, right, className = '', children }) {
  return (
    <section className={`panel ${className}`.trim()}>
      <div className="panel-head">
        <span>{title}</span>
        <div>{right}</div>
      </div>
      <div className="panel-body">{children}</div>
    </section>
  )
}
