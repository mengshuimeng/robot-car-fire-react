import EmptyState from '../common/EmptyState'

function MockMap({ markers, robotPosition }) {
  return (
    <div className="map map-mock">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 80 C15 60, 18 64, 31 52 S55 31, 72 42 S89 60, 100 45" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="0.8" />
        <path d="M0 18 C14 26, 22 30, 36 18 S62 8, 100 22" fill="none" stroke="rgba(59,130,246,0.18)" strokeWidth="0.8" />
        <path d="M20 100 C28 82, 38 76, 46 62 S64 34, 72 0" fill="none" stroke="rgba(59,130,246,0.22)" strokeWidth="0.8" />
        <path d="M64 100 C60 74, 70 68, 82 52 S90 36, 100 24" fill="none" stroke="rgba(59,130,246,0.22)" strokeWidth="0.8" />
      </svg>

      {markers.map((marker) => (
        <span key={marker.id} className="place" style={{ left: marker.left, top: marker.top }}>
          {marker.label}
        </span>
      ))}

      <div className="dog-light" style={{ left: robotPosition.left, top: robotPosition.top }}>
        <div className="dot" />
        <div className="label">机器狗巡检位置</div>
      </div>
    </div>
  )
}

export default function MapView({ mode = 'mock', markers = [], robotPosition, backgroundImage }) {
  if (mode === 'image' && backgroundImage) {
    return (
      <div className="map map-image">
        <img src={backgroundImage} alt="消防巡检场景图" className="map-image-bg" />
        {markers.map((marker) => (
          <span key={marker.id} className="place" style={{ left: marker.left, top: marker.top }}>
            {marker.label}
          </span>
        ))}
        <div className="dog-light" style={{ left: robotPosition.left, top: robotPosition.top }}>
          <div className="dot" />
          <div className="label">机器狗当前位置</div>
        </div>
      </div>
    )
  }

  if (mode === 'future') {
    return (
      <div className="map map-future">
        <div className="future-map-mount">Scene SDK Mount Point</div>
      </div>
    )
  }

  if (mode !== 'mock') {
    return <EmptyState title="场景模式未配置" description="请在 MapView 中切换为 mock / image / future 模式。" />
  }

  return <MockMap markers={markers} robotPosition={robotPosition} />
}
