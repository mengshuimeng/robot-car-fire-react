import { useMemo, useState } from 'react'
import Panel from '../layout/Panel'
import StatusBadge from '../common/StatusBadge'

export default function PublicityDashboard({ publicityData }) {
  const [activeChannel, setActiveChannel] = useState(publicityData.channels[0])

  const filteredQueue = useMemo(() => {
    if (activeChannel === '全部') {
      return publicityData.contentQueue
    }

    return publicityData.contentQueue.filter((item) => item.channel === activeChannel)
  }, [activeChannel, publicityData.contentQueue])

  return (
    <div className="module-page">
      <Panel title="宣传任务总览" right={<span className="mini-tag">消防宣传月</span>} className="campaign-panel">
        <div className="campaign-hero">
          <div>
            <strong className="campaign-title">{publicityData.campaignSummary.title}</strong>
            <p className="campaign-text">{publicityData.campaignSummary.period}</p>
            <p className="campaign-text">{publicityData.campaignSummary.coverage}</p>
          </div>
          <div className="campaign-progress">
            <span>宣传进度</span>
            <strong>{publicityData.campaignSummary.progress}%</strong>
            <div className="campaign-track">
              <div className="campaign-fill" style={{ width: `${publicityData.campaignSummary.progress}%` }} />
            </div>
          </div>
        </div>
      </Panel>

      <section className="hero-strip">
        {publicityData.campaignCards.map((item) => (
          <article key={item.title} className="hero-card">
            <span className="hero-label">{item.title}</span>
            <strong className="hero-value">
              {item.value}
            </strong>
            <StatusBadge tone={item.tone}>{item.subtitle}</StatusBadge>
          </article>
        ))}
      </section>

      <div className="module-grid module-grid-publicity">
        <Panel title="内容排期队列" right={<span className="mini-tag">待执行</span>}>
          <div className="filter-chips">
            {publicityData.channels.map((channel) => (
              <button
                key={channel}
                className={`filter-chip ${activeChannel === channel ? 'is-active' : ''}`}
                onClick={() => setActiveChannel(channel)}
              >
                {channel}
              </button>
            ))}
          </div>
          <div className="queue-list">
            {filteredQueue.map((item) => (
              <article key={item.id} className="queue-card">
                <div className="queue-title-row">
                  <strong>{item.title}</strong>
                  <StatusBadge tone={item.tone}>{item.status}</StatusBadge>
                </div>
                <div className="queue-meta">
                  <span>{item.channel}</span>
                  <span>{item.schedule}</span>
                </div>
              </article>
            ))}
          </div>
        </Panel>

        <Panel title="宣传活动编排" right={<span className="mini-tag">场次管理</span>}>
          <div className="activity-list">
            {publicityData.activities.map((item) => (
              <article key={item.name} className="activity-card">
                <div className="queue-title-row">
                  <strong>{item.name}</strong>
                  <StatusBadge tone={item.tone}>{item.status}</StatusBadge>
                </div>
                <div className="queue-meta">
                  <span>对象 {item.audience}</span>
                  <span>地点 {item.place}</span>
                </div>
              </article>
            ))}
          </div>
        </Panel>

        <Panel title="宣传物料库" right={<span className="mini-tag">最新更新</span>}>
          <div className="materials-table">
            {publicityData.materials.map((item) => (
              <div key={item.name} className="materials-row">
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.type}</span>
                </div>
                <div>
                  <span>{item.updatedAt}</span>
                  <span>{item.owner}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  )
}
