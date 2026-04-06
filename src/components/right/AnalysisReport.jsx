import Panel from '../layout/Panel'
import StatusBadge from '../common/StatusBadge'
import EmptyState from '../common/EmptyState'
import LoadingBlock from '../common/LoadingBlock'

export default function AnalysisReport({ report, inspectionStatus, onPreview, loading, error }) {
  return (
    <Panel
      title="算法分析识别报告"
      right={<button className="report-btn" onClick={onPreview}>预览</button>}
      className="report-panel"
    >
      {loading ? (
        <LoadingBlock title="报告生成中" description="正在同步识别对象、点位、风险等级与整改建议。" />
      ) : error ? (
        <EmptyState title="报告加载失败" description={error} />
      ) : !report ? (
        <EmptyState title="暂无结构化报告" description={`当前任务状态为 ${inspectionStatus}，识别完成后会生成结构化报告。`} />
      ) : (
        <div className="report-layout">
          <div className="report-box">
            <div className="report-title-row">
              <strong>分析摘要</strong>
              <StatusBadge tone={report.riskLevel}>{report.status}</StatusBadge>
            </div>
            <p>{report.summary}</p>
          </div>

          <div className="report-grid">
            <div className="report-item"><label>识别对象</label><span>{report.targetType}</span></div>
            <div className="report-item"><label>点位</label><span>{report.location}</span></div>
            <div className="report-item"><label>识别时间</label><span>{report.identifyTime}</span></div>
            <div className="report-item"><label>置信度</label><span>{report.confidence}</span></div>
            <div className="report-item"><label>巡检人</label><span>{report.inspector}</span></div>
            <div className="report-item"><label>风险等级</label><span>{report.riskLabel}</span></div>
          </div>

          <div className="hint-box">
            <strong>风险描述</strong>
            <p>{report.riskDescription}</p>
          </div>

          <div className="hint-box">
            <strong>整改建议</strong>
            <p>{report.suggestion}</p>
          </div>
        </div>
      )}
    </Panel>
  )
}
