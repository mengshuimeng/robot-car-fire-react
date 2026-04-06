import Panel from '../layout/Panel'
import MapView from './MapView'
import InspectionForm from './InspectionForm'

export default function LocationPanel({ summary, inspectionInfo, inspectionStatus, marker, onPrepare, onStart, onFinish }) {
  const robotPosition = marker
    ? { left: marker.left, top: marker.top }
    : summary.robotPosition

  return (
    <Panel title="实时场景" right={<span className="mini-tag">{summary.locationModeLabel}</span>}>
      <MapView
        mode={summary.mapMode}
        markers={summary.markers}
        robotPosition={robotPosition}
        backgroundImage={summary.backgroundImage}
      />
      <InspectionForm
        inspectionInfo={inspectionInfo}
        inspectionStatus={inspectionStatus}
        onPrepare={onPrepare}
        onStart={onStart}
        onFinish={onFinish}
      />
    </Panel>
  )
}
