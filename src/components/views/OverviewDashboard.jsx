import Panel from '../layout/Panel'
import StatusBadge from '../common/StatusBadge'

function TrendBars({ items }) {
  const max = Math.max(...items.map((item) => item.value), 1)

  return (
    <div className="trend-bars">
      {items.map((item) => (
        <div key={item.period} className="trend-item">
          <div className="trend-bar-track">
            <div className="trend-bar-fill" style={{ height: `${(item.value / max) * 100}%` }} />
          </div>
          <span className="trend-value">{item.value}</span>
          <span className="trend-label">{item.period}</span>
        </div>
      ))}
    </div>
  )
}

export default function OverviewDashboard({ overviewData }) {
  return (
    <div className="module-page">
      <section className="hero-strip">
        {overviewData.headlineMetrics.map((item) => (
          <article key={item.label} className="hero-card">
            <span className="hero-label">{item.label}</span>
            <strong className="hero-value">
              {item.value}
              <em>{item.unit}</em>
            </strong>
            <StatusBadge tone={item.tone}>{item.trend}</StatusBadge>
          </article>
        ))}
      </section>

      <div className="module-grid module-grid-overview">
        <Panel title="楼宇消防态势" right={<span className="mini-tag">校区总览</span>}>
          <div className="building-list">
            {overviewData.buildingStatus.map((item) => (
              <article key={item.name} className="building-card">
                <div className="building-head">
                  <strong>{item.name}</strong>
                  <StatusBadge tone={item.tone}>{item.risk}</StatusBadge>
                </div>
                <div className="building-meta">
                  <span>设备数 {item.devices}</span>
                  <span>在线率 {item.onlineRate}</span>
                </div>
              </article>
            ))}
          </div>
        </Panel>

        <Panel title="今日告警趋势" right={<span className="mini-tag">按时段</span>}>
          <TrendBars items={overviewData.warningTrend} />
        </Panel>

        <Panel title="巡检任务分布" right={<span className="mini-tag">重点区域</span>}>
          <div className="distribution-list">
            {overviewData.taskDistribution.map((item) => (
              <div key={item.name} className="distribution-row">
                <span>{item.name}</span>
                <div className="distribution-track">
                  <div className="distribution-fill" style={{ width: `${item.value * 7}%` }} />
                </div>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="最新联动事件" right={<span className="mini-tag">实时播报</span>}>
          <div className="timeline-list">
            {overviewData.recentEvents.map((item) => (
              <article key={`${item.time}-${item.title}`} className="timeline-item">
                <span className="timeline-time">{item.time}</span>
                <div className="timeline-content">
                  <div className="timeline-title-row">
                    <strong>{item.title}</strong>
                    <StatusBadge tone={item.tone}>联动</StatusBadge>
                  </div>
                  <p className="timeline-detail">{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  )
}
