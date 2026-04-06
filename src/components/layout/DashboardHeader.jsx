import StatusBadge from '../common/StatusBadge'

export default function DashboardHeader({ title, brand, locationText, clockText, username, status }) {
  return (
    <header className="header">
      <div className="header-row">
        <div className="brand">
          <strong>{brand}</strong>
          <span>{locationText}</span>
        </div>
        <div className="title-wrap">
          <div className="title">{title}</div>
          <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
        </div>
        <div className="meta">
          <span>{clockText}</span>
          <span>{username}</span>
        </div>
      </div>
    </header>
  )
}
