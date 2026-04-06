export const mockInspectionInfo = {
  taskId: 'TASK-20260406-001',
  location: '龙湖时代天街',
  area: '1000 m2',
  inspector: '张三',
  formReadyTime: '2026-04-06 12:00:00',
  startTime: '2026-04-06 12:08:00',
  endTime: '2026-04-06 12:22:00',
}

export const mockDashboardSummary = {
  mapMode: 'image',
  locationModeLabel: '教学楼消防场景',
  backgroundImage: '/scenes/campus-fire-scene.svg',
  robotPosition: { left: '52%', top: '76%' },
  markers: [
    { id: 'm1', label: '室内消防栓', left: '32%', top: '42%' },
    { id: 'm2', label: '灭火器', left: '62%', top: '43%' },
    { id: 'm3', label: '疏散标志', left: '81%', top: '40%' },
    { id: 'm4', label: '消防通道占用点', left: '54%', top: '73%' },
    { id: 'm5', label: '教学楼巡检区域', left: '12%', top: '22%' },
  ],
}

export const mockAlarmRows = [
  { id: 1, deviceName: '通道2', identifyTime: '2026-04-06 12:08:14', result: '室内消防栓', level: 'success', imageUrl: '/snapshots/hydrant.svg', reportId: 'report-001', type: '室内消防栓' },
  { id: 2, deviceName: '点位A-01', identifyTime: '2026-04-06 12:09:02', result: '灭火器', level: 'success', imageUrl: '/snapshots/extinguisher.svg', reportId: 'report-002', type: '灭火器' },
  { id: 3, deviceName: '点位A-02', identifyTime: '2026-04-06 12:10:18', result: '消防通道', level: 'warning', imageUrl: '/snapshots/passageway.svg', reportId: 'report-003', type: '消防通道' },
  { id: 4, deviceName: '点位B-01', identifyTime: '2026-04-06 12:12:44', result: '疏散标志', level: 'success', imageUrl: '/snapshots/exit-sign.svg', reportId: 'report-004', type: '疏散标志' },
]

export const mockStats = [
  { name: '疏散标志', ok: 1, warn: 0 },
  { name: '灭火器', ok: 1, warn: 0 },
  { name: '消防通道', ok: 0, warn: 1 },
  { name: '室内消防栓', ok: 1, warn: 0 },
]

export const mockRecognitionTypes = [
  { key: '疏散标志', label: '疏散标志' },
  { key: '灭火器', label: '灭火器' },
  { key: '消防通道', label: '消防通道' },
  { key: '室内消防栓', label: '室内消防栓' },
]

export const mockReports = {
  疏散标志: { targetType: '疏散标志', location: '点位B-01', identifyTime: '2026-04-06 12:12:44', confidence: '98.1%', status: '正常', riskLevel: 'success', riskLabel: '低风险', summary: '疏散标志位置清晰、无遮挡，亮度与安装角度符合日常巡检要求。', riskDescription: '未发现松动、遮挡、缺损等异常。', suggestion: '保持当前巡检频率，并纳入月度图像对比基线。', inspector: '张三', sourceAlarmId: 4 },
  灭火器: { targetType: '灭火器', location: '点位A-01', identifyTime: '2026-04-06 12:09:02', confidence: '96.7%', status: '正常', riskLevel: 'success', riskLabel: '低风险', summary: '灭火器位置可达性正常，外观完整，巡检识别结果通过。', riskDescription: '未检测到遮挡、倾倒或压力异常的视觉特征。', suggestion: '建议继续结合后端台账核验生产日期和维护记录。', inspector: '张三', sourceAlarmId: 2 },
  消防通道: { targetType: '消防通道', location: '点位A-02', identifyTime: '2026-04-06 12:10:18', confidence: '93.2%', status: '高风险', riskLevel: 'danger', riskLabel: '高风险', summary: '消防通道存在疑似堆物占用，通行宽度不满足安全要求，需要立即复核。', riskDescription: '检测框显示通道中部存在持续遮挡物，影响应急疏散与设备通行。', suggestion: '立即清理占道物，复拍确认通道净空，并同步生成整改闭环记录。', inspector: '张三', sourceAlarmId: 3 },
  室内消防栓: { targetType: '室内消防栓', location: '通道2', identifyTime: '2026-04-06 12:08:14', confidence: '97.4%', status: '正常', riskLevel: 'info', riskLabel: '中风险', summary: '室内消防栓柜门、阀门和软管区域识别完整，当前画面未发现明显异常。', riskDescription: '建议后续联动 OCR 与阀门状态识别，补齐铭牌和压力表的细粒度检测。', suggestion: '接入大模型报告生成后，可补充阀门角度、箱门状态及保养记录联查。', inspector: '张三', sourceAlarmId: 1 },
}

export const mockSnapshots = {
  疏散标志: { title: '疏散标志快照', caption: '点位B-01 / 识别通过', imageUrl: '/snapshots/exit-sign.svg' },
  灭火器: { title: '灭火器快照', caption: '点位A-01 / 状态正常', imageUrl: '/snapshots/extinguisher.svg' },
  消防通道: { title: '消防通道快照', caption: '点位A-02 / 存在占用', imageUrl: '/snapshots/passageway.svg' },
  室内消防栓: { title: '室内消防栓快照', caption: '通道2 / 联动视频主画面', imageUrl: '/snapshots/hydrant.svg' },
}

export const mockVideoConfig = {
  mode: 'video',
  src: '/demo.mp4',
  poster: '',
  streamType: 'mjpeg',
  streamSrc: 'http://127.0.0.1:5000/video_feed',
}

export const mockOverviewData = {
  headlineMetrics: [
    { label: '校园消防设备总数', value: '1,286', unit: '个', tone: 'info', trend: '+12' },
    { label: '今日巡检覆盖率', value: '84', unit: '%', tone: 'success', trend: '+6%' },
    { label: '待整改隐患', value: '7', unit: '项', tone: 'warning', trend: '-2' },
    { label: '高风险区域', value: '2', unit: '处', tone: 'danger', trend: '需复核' },
  ],
  buildingStatus: [
    { name: '第一教学楼', devices: 236, onlineRate: '98%', risk: '低风险', tone: 'success', inspector: '王敏', pending: 1, detail: '今日完成 3 轮自动巡检，教学楼东翼灭火器复核已通过。' },
    { name: '图书馆', devices: 188, onlineRate: '96%', risk: '低风险', tone: 'success', inspector: '周宁', pending: 0, detail: '图书馆主阅览区消防栓和疏散标志状态稳定，夜间巡更待执行。' },
    { name: '实验中心', devices: 154, onlineRate: '91%', risk: '中风险', tone: 'info', inspector: '李哲', pending: 2, detail: '实验中心存在两处高温区域待复核，建议增加通道摄像头联动。' },
    { name: '学生宿舍 A 区', devices: 322, onlineRate: '89%', risk: '高风险', tone: 'danger', inspector: '刘洋', pending: 4, detail: '宿舍 A 区 3 层通道占用告警反复出现，需辅导员与宿管共同介入。' },
  ],
  warningTrend: [
    { period: '08:00', value: 2 },
    { period: '10:00', value: 3 },
    { period: '12:00', value: 5 },
    { period: '14:00', value: 4 },
    { period: '16:00', value: 7 },
    { period: '18:00', value: 3 },
  ],
  taskDistribution: [
    { name: '教学楼', value: 12 },
    { name: '实验室', value: 8 },
    { name: '宿舍楼', value: 10 },
    { name: '公共区域', value: 6 },
  ],
  recentEvents: [
    { time: '12:11', title: '第二教学楼完成灭火器巡检', detail: '识别 24 个点位，全部正常', tone: 'success' },
    { time: '12:24', title: '宿舍 A 区发现消防通道占用', detail: '已派发整改工单，要求 30 分钟内处理', tone: 'warning' },
    { time: '12:36', title: '实验中心消防栓柜复核通过', detail: '现场复拍与维护台账已同步', tone: 'info' },
  ],
  quickActions: [
    { label: '查看高风险区域', hint: '聚焦宿舍 A 区与实验中心', tone: 'danger' },
    { label: '导出今日消防简报', hint: '下载管理层汇报材料', tone: 'info' },
    { label: '同步整改工单', hint: '推送到后勤与保卫处', tone: 'success' },
  ],
}

export const mockPublicityData = {
  campaignSummary: {
    title: '春季校园消防宣传月',
    period: '2026-04-01 至 2026-04-30',
    coverage: '覆盖 28 栋楼宇 / 12,600 名师生',
    progress: 72,
  },
  campaignCards: [
    { title: '消防演练', subtitle: '教学楼疏散演练', value: '8 场', tone: 'info' },
    { title: '课程宣讲', subtitle: '班级安全教育', value: '36 次', tone: 'success' },
    { title: '海报更新', subtitle: '宣传栏与电子屏', value: '54 处', tone: 'cyan' },
    { title: '待发布内容', subtitle: '短视频与推文', value: '5 项', tone: 'warning' },
  ],
  contentQueue: [
    { id: 'P-01', title: '宿舍消防通道规范', channel: '宿舍电子屏', schedule: '04-08 19:00', status: '待审核', tone: 'warning' },
    { id: 'P-02', title: '灭火器使用四步法', channel: '校园公众号', schedule: '04-09 09:00', status: '已排期', tone: 'info' },
    { id: 'P-03', title: '实验室火灾逃生要点', channel: '实验楼大厅屏', schedule: '04-10 14:00', status: '制作中', tone: 'cyan' },
    { id: 'P-04', title: '机器狗巡检周报短视频', channel: '校园视频号', schedule: '04-11 18:00', status: '待审核', tone: 'warning' },
  ],
  activities: [
    { name: '消防知识快闪答题', audience: '全校学生', place: '图书馆广场', status: '进行中', tone: 'success' },
    { name: '实验室安全微课堂', audience: '实验员', place: '实验中心 201', status: '待开始', tone: 'info' },
    { name: '宿舍夜间疏散演练', audience: '宿舍 A/B 区', place: '宿舍园区', status: '待通知', tone: 'warning' },
  ],
  materials: [
    { name: '消防通道不要堆物', type: '海报', updatedAt: '2026-04-06', owner: '保卫处' },
    { name: '小车巡检现场纪实', type: '短视频', updatedAt: '2026-04-05', owner: '宣传中心' },
    { name: '实验室用火用电规范', type: '推文', updatedAt: '2026-04-04', owner: '实验室管理办' },
  ],
  channels: ['全部', '宿舍电子屏', '校园公众号', '实验楼大厅屏', '校园视频号'],
}
