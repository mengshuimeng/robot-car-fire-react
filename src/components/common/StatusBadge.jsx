export default function StatusBadge({ tone = 'info', children }) {
  return <span className={`status-badge ${tone}`}>{children}</span>
}
