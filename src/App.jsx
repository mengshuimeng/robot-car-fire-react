import { useEffect, useState } from 'react'

const alarmRows = [
  { id: 1, device: '通道2', time: '2025-09-16 16:37:54', result: '室内消防栓', level: 'ok' },
  { id: 2, device: '点位A-01', time: '2025-09-16 16:38:01', result: '灭火器', level: 'ok' },
  { id: 3, device: '点位A-02', time: '2025-09-16 16:38:12', result: '消防通道异常', level: 'warn' }
]

const stats = [
  { name: '疏散标志', ok: 1, warn: 0 },
  { name: '灭火器', ok: 1, warn: 0 },
  { name: '消防通道', ok: 0, warn: 1 },
  { name: '室内消防栓', ok: 1, warn: 0 }
]

const deviceTypes = ['疏散标志', '灭火器', '消防通道', '室内消防栓']
const tabs = ['信息总览', '检查任务', '宣传任务']

function Panel({ title, right, children, className = '' }) {
  return (
    <section className={`panel ${className}`}>
      <div className="panel-head">
        <span>{title}</span>
        <div>{right}</div>
      </div>
      <div className="panel-body">{children}</div>
    </section>
  )
}

function MapPanel() {
  return (
    <div className="map">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 80 C15 60, 18 64, 31 52 S55 31, 72 42 S89 60, 100 45" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="0.8" />
        <path d="M0 18 C14 26, 22 30, 36 18 S62 8, 100 22" fill="none" stroke="rgba(59,130,246,0.18)" strokeWidth="0.8" />
        <path d="M20 100 C28 82, 38 76, 46 62 S64 34, 72 0" fill="none" stroke="rgba(59,130,246,0.22)" strokeWidth="0.8" />
        <path d="M64 100 C60 74, 70 68, 82 52 S90 36, 100 24" fill="none" stroke="rgba(59,130,246,0.22)" strokeWidth="0.8" />
      </svg>

      <span className="place" style={{ left: '10%', top: '70%' }}>科技园北区</span>
      <span className="place" style={{ left: '68%', top: '60%' }}>滨河西路</span>
      <span className="place" style={{ left: '56%', top: '36%' }}>龙湖时代天街</span>
      <span className="place" style={{ left: '80%', top: '28%' }}>大学城区域</span>
      <span className="place" style={{ left: '18%', top: '28%' }}>智慧园区</span>

      <div className="dog-light">
        <div className="dot" />
        <div className="label">智能巡检小车位置</div>
      </div>
    </div>
  )
}

function VideoMock() {
  return (
    <div className="video">
      <div className="left-door" />
      <div className="cabinet">
        <div className="pipe" />
        <div className="valve1" />
        <div className="valve2" />
        <div className="hose" />
      </div>
      <div className="right-wall" />
      <div className="bottom-edge" />
      <div className="expand">⛶</div>
    </div>
  )
}

function StatsBars() {
  return (
    <>
      <div className="bars-legend">
        <span className="ok">正常</span>
        <span className="warn">异常</span>
      </div>
      <div className="bars">
        {stats.map((item) => (
          <div className="bar-item" key={item.name}>
            <div className="bar-wrap">
              <div className="bar ok" style={{ height: `${item.ok ? 100 : 20}px` }} />
              <div className="bar warn" style={{ height: `${item.warn ? 100 : 10}px` }} />
            </div>
            <div className="bar-name">{item.name}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default function App() {
  const [timeText, setTimeText] = useState('')
  const [activeType, setActiveType] = useState('室内消防栓')
  const [activeTab, setActiveTab] = useState('信息总览')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const week = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'][now.getDay()]
      const pad = (n) => String(n).padStart(2, '0')
      const text = `${now.getFullYear()}/${pad(now.getMonth()+1)}/${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${week}`
      setTimeText(text)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <div className="header-row">
            <div className="brand">
              <span>我的位置：{activeTab}</span>
            </div>
            <div className="title">智慧校园消防管控平台</div>
            <div className="meta">
              <span>{timeText}</span>
              <span>admin</span>
            </div>
          </div>
        </header>

        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid">
          <div className="stack">
            <Panel title="实时位置" right={<span>···</span>}>
              <MapPanel />

              <div className="actions">
                <button className="blue-btn">开始检查信息填报</button>
                <button className="ghost-btn">开始检查</button>
                <button className="yellow-btn">结束检查</button>
              </div>

              <div className="form-grid">
                <div className="field">
                  <label>地点：</label>
                  <div className="value-box">龙湖时代天街</div>
                </div>
                <div className="field">
                  <label>总面积：</label>
                  <div className="value-box">1000</div>
                </div>
                <div className="field wide-short">
                  <label>检查人：</label>
                  <div className="value-box">张三</div>
                </div>
              </div>
            </Panel>

            <Panel title="本次结果累计概况" right={<span>···</span>}>
              <StatsBars />
            </Panel>
          </div>

          <div className="stack">
            <Panel title="实时视频" right={<span className="mini-tag">实时视频</span>}>
              <VideoMock />
            </Panel>

            <Panel title="实时报警信息数据" right={<button className="report-btn">下载</button>}>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>设备名称</th>
                      <th>识别时间</th>
                      <th>识别结果</th>
                      <th>识别图片</th>
                      <th>大模型分析报告</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alarmRows.map((row) => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.device}</td>
                        <td>{row.time}</td>
                        <td>
                          <span className={`badge ${row.level}`}>
                            ● {row.result}
                          </span>
                        </td>
                        <td className="link-text">查看</td>
                        <td className="link-text">详情</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          </div>

          <div className="stack">
            <Panel title="算法识别">
              <div className="camera-box">
                <button className="camera-btn">📷 拍照</button>
              </div>

              <div className="recognition-grid">
                {deviceTypes.map((item) => (
                  <button
                    key={item}
                    className={`rec-btn ${activeType === item ? 'active' : ''}`}
                    onClick={() => setActiveType(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="input-box">通道2</div>

              <div className="thumb">
                <div className="thumb-inner">
                  <div className="cab" />
                  <div className="wall" />
                  <div className="thumb-close">×</div>
                </div>
              </div>
            </Panel>

            <Panel
              title="算法分析识别报告"
              right={<button className="report-btn">预览</button>}
              className="report-panel"
            >
              <div className="report-box">
                <strong>分析摘要</strong>
                <br />
                当前识别目标为 <span className="highlight">{activeType}</span>，点位为“通道2”。
                系统可在此区域继续输出检测框、置信度、异常判断结果，并将报告同步到下方数据表。
              </div>

              <div className="hint-box">
                这里可以接入真实接口，展示 OCR 结果、视觉识别标签、风险描述、整改建议、导出链接等内容。
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  )
}
