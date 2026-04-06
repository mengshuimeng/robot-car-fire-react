import StatusBadge from '../common/StatusBadge'
import { inspectionStatuses } from '../../data/constants'

export default function InspectionForm({ inspectionInfo, inspectionStatus, onPrepare, onStart, onFinish }) {
  const statusMeta = inspectionStatuses[inspectionStatus]

  return (
    <div className="inspection-block">
      <div className="actions">
        <button className="blue-btn" disabled={inspectionStatus !== 'idle'} onClick={onPrepare}>
          开始检查信息填报
        </button>
        <button className="ghost-btn" disabled={inspectionStatus === 'finished' || inspectionStatus === 'running'} onClick={onStart}>
          开始检查
        </button>
        <button className="yellow-btn" disabled={inspectionStatus !== 'running'} onClick={onFinish}>
          结束检查
        </button>
      </div>

      <div className="summary-strip">
        <StatusBadge tone={statusMeta.tone}>{statusMeta.label}</StatusBadge>
        <span>任务编号：{inspectionInfo.taskId}</span>
        <span>当前区域：{inspectionInfo.location}</span>
      </div>

      <div className="form-grid">
        <div className="field">
          <label>地点：</label>
          <div className="value-box">{inspectionInfo.location}</div>
        </div>
        <div className="field">
          <label>总面积：</label>
          <div className="value-box">{inspectionInfo.area}</div>
        </div>
        <div className="field">
          <label>检查人：</label>
          <div className="value-box">{inspectionInfo.inspector}</div>
        </div>
        <div className="field">
          <label>开始检查信息填报：</label>
          <div className="value-box">{inspectionInfo.formReadyTime}</div>
        </div>
        <div className="field">
          <label>开始检查：</label>
          <div className="value-box">{inspectionInfo.startTime}</div>
        </div>
        <div className="field">
          <label>结束检查：</label>
          <div className="value-box">{inspectionInfo.endTime}</div>
        </div>
      </div>
    </div>
  )
}
