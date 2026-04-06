import { useEffect, useMemo, useState } from 'react'
import {
  getAlarmList,
  getDashboardSummary,
  getInspectionInfo,
  getOverviewData,
  getPublicityData,
  getRecognitionReport,
  getRecognitionTypes,
  getSnapshots,
  getStats,
  getVideoConfig,
} from '../services/dashboardApi'
import { getMarkerByLabel } from '../utils/helpers'
import { inspectionStatuses } from '../data/constants'

export function useDashboardData({ activeType, inspectionStatus }) {
  const [state, setState] = useState({
    loading: {
      dashboard: true,
      alarms: true,
      report: true,
    },
    error: '',
    errors: {
      dashboard: '',
      alarms: '',
      report: '',
    },
    summary: null,
    overviewData: null,
    publicityData: null,
    inspectionInfo: null,
    alarmRows: [],
    stats: [],
    recognitionTypeOptions: [],
    snapshots: {},
    videoConfig: { mode: 'mock', src: '', poster: '', streamType: 'mjpeg', streamSrc: '' },
  })
  const [activeReport, setActiveReport] = useState(null)
  const [visibleCount, setVisibleCount] = useState(0)

  async function refreshDashboard() {
    setState((current) => ({
      ...current,
      loading: { ...current.loading, dashboard: true },
      error: '',
      errors: { ...current.errors, dashboard: '' },
    }))

    try {
      const [
        summary,
        inspectionInfo,
        stats,
        recognitionTypeOptions,
        snapshots,
        videoConfig,
        overviewData,
        publicityData,
      ] = await Promise.all([
        getDashboardSummary(),
        getInspectionInfo(),
        getStats(),
        getRecognitionTypes(),
        getSnapshots(),
        getVideoConfig(),
        getOverviewData(),
        getPublicityData(),
      ])

      setState((current) => ({
        ...current,
        loading: { ...current.loading, dashboard: false },
        errors: { ...current.errors, dashboard: '' },
        summary,
        overviewData,
        publicityData,
        inspectionInfo,
        stats,
        recognitionTypeOptions,
        snapshots,
        videoConfig,
      }))
    } catch (error) {
      setState((current) => ({
        ...current,
        loading: { ...current.loading, dashboard: false },
        error: error instanceof Error ? error.message : '未知错误',
        errors: {
          ...current.errors,
          dashboard: error instanceof Error ? error.message : '未知错误',
        },
      }))
    }
  }

  async function refreshAlarmList() {
    setState((current) => ({
      ...current,
      loading: { ...current.loading, alarms: true },
      error: '',
      errors: { ...current.errors, alarms: '' },
    }))

    try {
      const alarmRows = await getAlarmList()
      setState((current) => ({
        ...current,
        loading: { ...current.loading, alarms: false },
        errors: { ...current.errors, alarms: '' },
        alarmRows,
      }))
    } catch (error) {
      setState((current) => ({
        ...current,
        loading: { ...current.loading, alarms: false },
        error: error instanceof Error ? error.message : '未知错误',
        errors: {
          ...current.errors,
          alarms: error instanceof Error ? error.message : '未知错误',
        },
      }))
    }
  }

  async function refreshReport(type = activeType) {
    setState((current) => ({
      ...current,
      loading: { ...current.loading, report: true },
      error: '',
      errors: { ...current.errors, report: '' },
    }))

    try {
      const report = await getRecognitionReport(type)
      setActiveReport(report)
      setState((current) => ({
        ...current,
        loading: { ...current.loading, report: false },
        errors: { ...current.errors, report: '' },
      }))
    } catch (error) {
      setActiveReport(null)
      setState((current) => ({
        ...current,
        loading: { ...current.loading, report: false },
        error: error instanceof Error ? error.message : '未知错误',
        errors: {
          ...current.errors,
          report: error instanceof Error ? error.message : '未知错误',
        },
      }))
    }
  }

  useEffect(() => {
    refreshDashboard()
    refreshAlarmList()
  }, [])

  useEffect(() => {
    refreshReport(activeType)
  }, [activeType])

  useEffect(() => {
    if (inspectionStatus === 'idle') {
      setVisibleCount(0)
      return
    }

    if (inspectionStatus === 'pending') {
      setVisibleCount(0)
      return
    }

    if (inspectionStatus === 'finished') {
      setVisibleCount(state.alarmRows.length)
      return
    }

    if (inspectionStatus !== 'running') {
      return
    }

    setVisibleCount((count) => (count < 1 ? 1 : count))
    const timer = window.setInterval(() => {
      setVisibleCount((count) => {
        if (count >= state.alarmRows.length) {
          window.clearInterval(timer)
          return count
        }

        return count + 1
      })
    }, 1800)

    return () => window.clearInterval(timer)
  }, [inspectionStatus, state.alarmRows.length])

  const visibleRows = useMemo(() => state.alarmRows.slice(0, visibleCount), [state.alarmRows, visibleCount])

  const currentReport = useMemo(() => {
    if (!visibleRows.length) {
      return activeReport
    }

    const latestRelatedRow = [...visibleRows].reverse().find((row) => row.type === activeType)
    if (latestRelatedRow && activeReport) {
      return {
        ...activeReport,
        location: latestRelatedRow.deviceName,
        identifyTime: latestRelatedRow.identifyTime,
        sourceAlarmId: latestRelatedRow.id,
      }
    }

    return activeReport
  }, [activeReport, activeType, visibleRows])

  const reportByStatus = useMemo(() => {
    if (inspectionStatus === 'idle') {
      return {
        targetType: activeType,
        location: state.inspectionInfo?.location ?? '--',
        identifyTime: '--',
        confidence: '--',
        status: inspectionStatuses.idle.label,
        riskLevel: inspectionStatuses.idle.tone,
        riskLabel: '待巡检',
        summary: '任务尚未开始，请先完成检查信息填报。',
        riskDescription: '当前未进入识别阶段，系统不会产出风险判断。',
        suggestion: '点击“开始检查信息填报”后进入待检查状态。',
        inspector: state.inspectionInfo?.inspector ?? '--',
        sourceAlarmId: null,
      }
    }

    if (inspectionStatus === 'pending') {
      return {
        targetType: activeType,
        location: state.inspectionInfo?.location ?? '--',
        identifyTime: '--',
        confidence: '--',
        status: inspectionStatuses.pending.label,
        riskLevel: inspectionStatuses.pending.tone,
        riskLabel: '待识别',
        summary: '基础信息已就绪，等待启动巡检视频与识别链路。',
        riskDescription: '尚未拉起实时识别，不生成异常判断。',
        suggestion: '点击“开始检查”进入巡检中状态。',
        inspector: state.inspectionInfo?.inspector ?? '--',
        sourceAlarmId: null,
      }
    }

    return currentReport
  }, [activeType, currentReport, inspectionStatus, state.inspectionInfo])

  return {
    loading: state.loading.dashboard,
    loadingState: state.loading,
    error: state.error,
    errors: state.errors,
    summary: state.summary,
    overviewData: state.overviewData,
    publicityData: state.publicityData,
    inspectionInfo: state.inspectionInfo,
    alarmRows: state.alarmRows,
    visibleRows,
    stats: state.stats,
    recognitionTypeOptions: state.recognitionTypeOptions,
    currentReport: reportByStatus,
    activeReport: reportByStatus,
    activeSnapshot: state.snapshots[activeType],
    activeMarker: getMarkerByLabel(state.summary?.markers ?? [], reportByStatus?.location),
    videoConfig: state.videoConfig,
    refreshDashboard,
    refreshAlarmList,
    refreshReport,
  }
}
