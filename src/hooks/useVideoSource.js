export function useVideoSource({ requestedMode, videoConfig, inspectionStatus }) {
  if (inspectionStatus === 'idle' || inspectionStatus === 'pending') {
    return {
      mode: 'mock',
      videoSrc: '',
      streamSrc: '',
      streamType: 'mjpeg',
      poster: '',
      titleTag: 'mock 模式',
    }
  }

  if (requestedMode === 'stream') {
    return {
      mode: 'stream',
      videoSrc: '',
      streamSrc: videoConfig.streamSrc,
      streamType: videoConfig.streamType,
      poster: videoConfig.poster,
      titleTag: '实时流模式',
    }
  }

  if (requestedMode === 'video') {
    return {
      mode: 'video',
      videoSrc: videoConfig.src,
      streamSrc: '',
      streamType: videoConfig.streamType,
      poster: videoConfig.poster,
      titleTag: 'demo 视频模式',
    }
  }

  return {
    mode: 'mock',
    videoSrc: '',
    streamSrc: '',
    streamType: videoConfig.streamType,
    poster: videoConfig.poster,
    titleTag: 'mock 模式',
  }
}
