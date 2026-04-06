import Panel from '../layout/Panel'
import RecognitionTypeButtons from './RecognitionTypeButtons'
import SnapshotPreview from './SnapshotPreview'

export default function RecognitionPanel({ activeType, types, snapshot, report, pointName, onTypeChange }) {
  return (
    <Panel title="算法识别" right={<span className="mini-tag">识别联动</span>}>
      <div className="camera-box">
        <button className="camera-btn">拍照</button>
      </div>

      <RecognitionTypeButtons types={types} activeType={activeType} onChange={onTypeChange} />

      <div className="input-box">
        <span>点位：</span>
        <strong>{pointName}</strong>
      </div>

      <div className="recognition-pills">
        <span>置信度 {report?.confidence ?? '--'}</span>
        <span>状态 {report?.status ?? '--'}</span>
      </div>

      <SnapshotPreview snapshot={snapshot} />
    </Panel>
  )
}
