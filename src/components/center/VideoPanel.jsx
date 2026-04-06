import { useEffect, useState } from 'react'
import Panel from '../layout/Panel'
import EmptyState from '../common/EmptyState'
import { inspectionStatuses } from '../../data/constants'

function MockVideo() {
  return (
    <div className="video video-mock">
      <div className="left-door" />
      <div className="cabinet">
        <div className="pipe" />
        <div className="valve1" />
        <div className="valve2" />
        <div className="hose" />
      </div>
      <div className="right-wall" />
      <div className="bottom-edge" />
      <div className="expand">⛶</div>
    </div>
  )
}

export default function VideoPanel({ mode, videoSrc, streamSrc, streamType, poster, titleTag, inspectionStatus }) {
  const status = inspectionStatuses[inspectionStatus]
  const [mediaError, setMediaError] = useState('')

  useEffect(() => {
    setMediaError('')
  }, [mode, videoSrc, streamSrc, streamType])

  let content = <EmptyState title="暂无视频源" description="请在 services/dashboardApi.js 中配置视频源。" />

  if (mediaError) {
    content = <EmptyState title="视频资源加载失败" description={mediaError} />
  } else if (mode === 'mock') {
    content = <MockVideo />
  } else if (mode === 'video' && videoSrc) {
    content = (
      <div className="video video-surface">
        <video
          className="video-media"
          src={videoSrc}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          onError={() => setMediaError('本地 demo 视频不可用，请检查 public/demo.mp4 是否存在。')}
        />
      </div>
    )
  } else if (mode === 'stream' && streamSrc) {
    content = (
      <div className="video video-surface">
        {streamType === 'mjpeg' ? (
          <img
            className="video-media"
            src={streamSrc}
            alt="实时视频流"
            onError={() => setMediaError('实时流地址不可访问，请检查 streamSrc 与后端服务状态。')}
          />
        ) : (
          <video
            className="video-media"
            src={streamSrc}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            controls
            onError={() => setMediaError('视频流地址不可播放，请检查后端返回格式。')}
          />
        )}
      </div>
    )
  } else if (mode === 'video' || mode === 'stream') {
    content = <EmptyState title="视频源未配置" description="当前模式缺少可用地址，请检查 dashboardApi.js 返回的 videoConfig。" />
  }

  return (
    <Panel
      title="实时视频"
      right={
        <div className="panel-head-mix">
          <span className="mini-tag">{titleTag}</span>
          <span className={`mini-status ${status.tone}`}>{status.label}</span>
        </div>
      }
    >
      {content}
    </Panel>
  )
}
