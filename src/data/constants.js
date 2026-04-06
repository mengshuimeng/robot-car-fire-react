export const dashboardTabs = [
  { key: 'overview', label: '信息总览' },
  { key: 'inspection', label: '检查任务' },
  { key: 'publicity', label: '宣传任务' },
]

export const recognitionTypes = [
  { key: '疏散标志', label: '疏散标志' },
  { key: '灭火器', label: '灭火器' },
  { key: '消防通道', label: '消防通道' },
  { key: '室内消防栓', label: '室内消防栓' },
]

export const inspectionStatuses = {
  idle: { label: '待填报', tone: 'muted' },
  pending: { label: '待检查', tone: 'info' },
  running: { label: '检查中', tone: 'cyan' },
  finished: { label: '已完成', tone: 'success' },
}
