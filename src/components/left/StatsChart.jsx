import Panel from '../layout/Panel'

export default function StatsChart({ items }) {
  return (
    <Panel title="本次结果累计概况" right={<span className="mini-tag">CSS Chart</span>}>
      <div className="bars-legend">
        <span className="ok">正常</span>
        <span className="warn">异常</span>
      </div>
      <div className="bars">
        {items.map((item) => (
          <div className="bar-item" key={item.name}>
            <div className="bar-wrap">
              <div className="bar ok" style={{ height: `${Math.max(item.ok * 26, 18)}px` }} />
              <div className="bar warn" style={{ height: `${Math.max(item.warn * 26, 10)}px` }} />
            </div>
            <div className="bar-meta">
              <span>N:{item.ok}</span>
              <span>W:{item.warn}</span>
            </div>
            <div className="bar-name">{item.name}</div>
          </div>
        ))}
      </div>
    </Panel>
  )
}
