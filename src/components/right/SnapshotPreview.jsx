import EmptyState from '../common/EmptyState'

export default function SnapshotPreview({ snapshot }) {
  if (!snapshot?.imageUrl) {
    return (
      <div className="thumb thumb-empty">
        <EmptyState title="暂无识别快照" description="切换识别类型或开始巡检后，这里会展示当前对象截图。" />
      </div>
    )
  }

  return (
    <div className="thumb">
      <div className="thumb-inner">
        <img src={snapshot.imageUrl} alt={snapshot.title} className="snapshot-image" />
        <div className="thumb-close">×</div>
      </div>
      <div className="thumb-caption">
        <strong>{snapshot.title}</strong>
        <span>{snapshot.caption}</span>
      </div>
    </div>
  )
}
