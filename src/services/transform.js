export function normalizeVideoConfig(config) {
  return {
    mode: config.mode ?? 'mock',
    src: config.src ?? '',
    poster: config.poster ?? '',
    streamType: config.streamType ?? 'mjpeg',
    streamSrc: config.streamSrc ?? '',
  }
}

export function normalizeDashboardSummary(summary) {
  return {
    mapMode: summary.mapMode ?? summary.map_mode ?? 'mock',
    locationModeLabel: summary.locationModeLabel ?? summary.location_mode_label ?? '标准地图容器',
    backgroundImage: summary.backgroundImage ?? summary.background_image ?? '',
    robotPosition: summary.robotPosition ?? summary.robot_position ?? { left: '46%', top: '46%' },
    markers: (summary.markers ?? []).map((marker, index) => ({
      id: marker.id ?? `marker-${index + 1}`,
      label: marker.label ?? marker.name ?? '',
      left: marker.left ?? marker.x ?? '50%',
      top: marker.top ?? marker.y ?? '50%',
    })),
  }
}

export function normalizeInspectionInfo(info) {
  return {
    taskId: info.taskId ?? info.task_id ?? '',
    location: info.location ?? info.location_name ?? '',
    area: info.area ?? info.total_area ?? '',
    inspector: info.inspector ?? info.inspector_name ?? '',
    formReadyTime: info.formReadyTime ?? info.form_ready_time ?? '',
    startTime: info.startTime ?? info.start_time ?? '',
    endTime: info.endTime ?? info.end_time ?? '',
  }
}

export function normalizeAlarmRows(rows) {
  return rows.map((row) => ({
    id: row.id ?? row.alarm_id ?? row.report_id ?? '',
    deviceName: row.deviceName ?? row.device_name ?? row.location ?? '',
    identifyTime: row.identifyTime ?? row.identify_time ?? row.created_at ?? '',
    result: row.result ?? row.target_type ?? row.detect_result ?? '',
    level: row.level ?? row.risk_level ?? 'info',
    imageUrl: row.imageUrl ?? row.image_url ?? '',
    reportId: row.reportId ?? row.report_id ?? '',
    type: row.type ?? row.targetType ?? row.target_type ?? row.result ?? '',
  }))
}

export function normalizeStats(stats) {
  return (stats ?? []).map((item) => ({
    name: item.name ?? item.type_name ?? '',
    ok: item.ok ?? item.ok_count ?? 0,
    warn: item.warn ?? item.warn_count ?? 0,
  }))
}

export function normalizeRecognitionTypes(types) {
  return (types ?? []).map((item) => ({
    key: item.key ?? item.type ?? item.label ?? '',
    label: item.label ?? item.name ?? item.key ?? '',
  }))
}

export function normalizeReport(report) {
  if (!report) {
    return null
  }

  return {
    targetType: report.targetType ?? report.target_type ?? '',
    location: report.location ?? report.location_name ?? '',
    identifyTime: report.identifyTime ?? report.identify_time ?? '',
    confidence: report.confidence ?? report.confidence_score ?? '--',
    status: report.status ?? report.result_status ?? '--',
    riskLevel: report.riskLevel ?? report.risk_level ?? 'info',
    riskLabel: report.riskLabel ?? report.risk_label ?? '--',
    summary: report.summary ?? report.analysis_summary ?? '',
    riskDescription: report.riskDescription ?? report.risk_description ?? '',
    suggestion: report.suggestion ?? report.recommendation ?? '',
    inspector: report.inspector ?? report.inspector_name ?? '',
    sourceAlarmId: report.sourceAlarmId ?? report.source_alarm_id ?? null,
  }
}
