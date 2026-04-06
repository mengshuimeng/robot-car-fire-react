import Panel from '../layout/Panel'
import StatusBadge from '../common/StatusBadge'
import EmptyState from '../common/EmptyState'
import LoadingBlock from '../common/LoadingBlock'

export default function AlarmTable({ rows, allRows, highlightRowId, activeType, loading, inspectionStatus, error, onRowSelect, selectedRowId }) {
  return (
    <Panel title="实时报警信息数据" right={<button className="report-btn">下载</button>}>
      {loading ? (
        <LoadingBlock title="报警数据加载中" description="正在准备巡检识别表格与结果明细。" />
      ) : error ? (
        <EmptyState title="报警数据获取失败" description={error} />
      ) : !rows.length ? (
        <EmptyState
          title="暂无报警记录"
          description={inspectionStatus === 'idle' ? '任务尚未开始，开始巡检后识别结果会按时间顺序进入表格。' : '当前没有匹配到识别记录。'}
        />
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>序号</th>
                <th>设备名称</th>
                <th>识别时间</th>
                <th>识别结果</th>
                <th>识别图片</th>
                <th>分析报告</th>
                <th>导出</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className={row.id === selectedRowId || row.id === highlightRowId || row.result === activeType ? 'is-highlight' : ''}
                  onClick={() => onRowSelect?.(row)}
                >
                  <td>{row.id}</td>
                  <td>{row.deviceName}</td>
                  <td>{row.identifyTime}</td>
                  <td>
                    <StatusBadge tone={row.level}>{row.result}</StatusBadge>
                  </td>
                  <td className="link-text">查看</td>
                  <td className="link-text">详情</td>
                  <td className="link-text">下载</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="table-footnote">当前展示 {rows.length} / {allRows.length} 条识别记录</div>
        </div>
      )}
    </Panel>
  )
}
