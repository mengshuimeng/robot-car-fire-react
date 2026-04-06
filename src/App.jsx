import { useEffect, useMemo, useState } from 'react'
import DashboardHeader from './components/layout/DashboardHeader'
import DashboardTabs from './components/layout/DashboardTabs'
import LocationPanel from './components/left/LocationPanel'
import StatsChart from './components/left/StatsChart'
import VideoPanel from './components/center/VideoPanel'
import AlarmTable from './components/center/AlarmTable'
import RecognitionPanel from './components/right/RecognitionPanel'
import AnalysisReport from './components/right/AnalysisReport'
import OverviewDashboard from './components/views/OverviewDashboard'
import PublicityDashboard from './components/views/PublicityDashboard'
import LoadingBlock from './components/common/LoadingBlock'
import EmptyState from './components/common/EmptyState'
import { dashboardTabs, inspectionStatuses } from './data/constants'
import { useClock } from './hooks/useClock'
import { useDashboardData } from './hooks/useDashboardData'
import { useVideoSource } from './hooks/useVideoSource'
import { DASHBOARD_CONFIG } from './config/dashboard'

export default function App() {
  const clock = useClock()
  const [activeTab, setActiveTab] = useState(DASHBOARD_CONFIG.defaultActiveTab)
  const [activeType, setActiveType] = useState(DASHBOARD_CONFIG.defaultActiveType)
  const [inspectionStatus, setInspectionStatus] = useState('idle')
  const [videoMode, setVideoMode] = useState(DASHBOARD_CONFIG.defaultVideoMode)

  const {
    loading,
    loadingState,
    error,
    errors,
    summary,
    overviewData,
    publicityData,
    inspectionInfo,
    stats,
    alarmRows,
    visibleRows,
    activeReport,
    activeSnapshot,
    activeMarker,
    recognitionTypeOptions,
    videoConfig,
  } = useDashboardData({ activeType, inspectionStatus })

  useEffect(() => {
    if (inspectionStatus === 'running') {
      setVideoMode(videoConfig.mode || DASHBOARD_CONFIG.defaultVideoMode)
      return
    }

    if (inspectionStatus === 'finished') {
      setVideoMode(videoConfig.mode === 'stream' ? 'stream' : DASHBOARD_CONFIG.defaultVideoMode)
      return
    }

    setVideoMode('mock')
  }, [inspectionStatus, videoConfig.mode])

  const activeTabLabel = dashboardTabs.find((tab) => tab.key === activeTab)?.label ?? ''
  const highlightRowId = activeReport?.sourceAlarmId ?? null
  const resolvedVideo = useVideoSource({
    requestedMode: videoMode,
    videoConfig,
    inspectionStatus,
  })

  const headerStatus = useMemo(
    () => {
      if (activeTab === 'overview') {
        return { label: '全局态势', tone: 'cyan' }
      }

      if (activeTab === 'publicity') {
        return { label: '宣传推进', tone: 'success' }
      }

      return {
        label: inspectionStatuses[inspectionStatus].label,
        tone: inspectionStatuses[inspectionStatus].tone,
      }
    },
    [activeTab, inspectionStatus]
  )

  const handlePrepare = () => {
    setInspectionStatus((current) => (current === 'idle' ? 'pending' : current))
  }

  const handleStart = () => {
    setInspectionStatus((current) => {
      if (current === 'pending' || current === 'idle') {
        return 'running'
      }

      return current
    })
  }

  const handleFinish = () => {
    setInspectionStatus((current) => (current === 'running' ? 'finished' : current))
  }

  const inspectionDashboard = (
    <div className="grid">
      <div className="stack">
        <LocationPanel
          summary={summary}
          inspectionInfo={inspectionInfo}
          inspectionStatus={inspectionStatus}
          marker={activeMarker}
          onPrepare={handlePrepare}
          onStart={handleStart}
          onFinish={handleFinish}
        />
        <StatsChart items={stats} />
      </div>

      <div className="stack">
        <VideoPanel
          mode={resolvedVideo.mode}
          videoSrc={resolvedVideo.videoSrc}
          streamSrc={resolvedVideo.streamSrc}
          streamType={resolvedVideo.streamType}
          poster={resolvedVideo.poster}
          titleTag={resolvedVideo.titleTag}
          inspectionStatus={inspectionStatus}
        />
        <AlarmTable
          rows={visibleRows}
          allRows={alarmRows}
          highlightRowId={highlightRowId}
          activeType={activeType}
          loading={loadingState.alarms}
          inspectionStatus={inspectionStatus}
          error={errors.alarms}
        />
      </div>

      <div className="stack">
        <RecognitionPanel
          activeType={activeType}
          types={recognitionTypeOptions}
          snapshot={activeSnapshot}
          report={activeReport}
          pointName={activeReport?.location ?? inspectionInfo.location}
          onTypeChange={setActiveType}
        />
        <AnalysisReport
          report={activeReport}
          inspectionStatus={inspectionStatus}
          onPreview={() => setVideoMode(videoConfig.mode)}
          loading={loadingState.report}
          error={errors.report}
        />
      </div>
    </div>
  )

  let activeContent = inspectionDashboard

  if (activeTab === 'overview') {
    activeContent = overviewData ? (
      <OverviewDashboard overviewData={overviewData} />
    ) : (
      <EmptyState title="总览数据缺失" description="请检查总览接口或 mock 数据是否已正确返回。" />
    )
  }

  if (activeTab === 'publicity') {
    activeContent = publicityData ? (
      <PublicityDashboard publicityData={publicityData} />
    ) : (
      <EmptyState title="宣传数据缺失" description="请检查宣传任务接口或 mock 数据是否已正确返回。" />
    )
  }

  return (
    <div className="page">
      <div className="container">
        <DashboardHeader
          title="智慧校园消防管控平台"
          brand="天发智控"
          locationText={`当前页面：${activeTabLabel}`}
          clockText={clock}
          username="admin"
          status={headerStatus}
        />

        <DashboardTabs tabs={dashboardTabs} activeTab={activeTab} onChange={setActiveTab} />

        {loading ? (
          <LoadingBlock title="正在加载巡检任务数据" description="已进入 mock 接口层，正在装配面板、表格、报告与视频配置。" />
        ) : error ? (
          <EmptyState title="数据加载失败" description={error} />
        ) : (
          activeContent
        )}
      </div>
    </div>
  )
}
