import {
  mockAlarmRows,
  mockDashboardSummary,
  mockInspectionInfo,
  mockOverviewData,
  mockPublicityData,
  mockRecognitionTypes,
  mockReports,
  mockSnapshots,
  mockStats,
  mockVideoConfig,
} from '../data/mockDashboard'
import {
  normalizeAlarmRows,
  normalizeDashboardSummary,
  normalizeInspectionInfo,
  normalizeRecognitionTypes,
  normalizeReport,
  normalizeStats,
  normalizeVideoConfig,
} from './transform'
import { DASHBOARD_CONFIG } from '../config/dashboard'

function wait(payload) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(payload), 120)
  })
}

async function requestJson(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function getDashboardSummary() {
  if (!DASHBOARD_CONFIG.useMock) {
    const data = await requestJson('/api/dashboard/summary')
    return normalizeDashboardSummary(data)
  }

  return wait(normalizeDashboardSummary(mockDashboardSummary))
}

export async function getOverviewData() {
  if (!DASHBOARD_CONFIG.useMock) {
    return requestJson('/api/dashboard/overview')
  }

  return wait(mockOverviewData)
}

export async function getPublicityData() {
  if (!DASHBOARD_CONFIG.useMock) {
    return requestJson('/api/dashboard/publicity')
  }

  return wait(mockPublicityData)
}

export async function getAlarmList() {
  if (!DASHBOARD_CONFIG.useMock) {
    const data = await requestJson('/api/dashboard/alarms')
    return normalizeAlarmRows(data)
  }

  return wait(normalizeAlarmRows(mockAlarmRows))
}

export async function getInspectionInfo() {
  if (!DASHBOARD_CONFIG.useMock) {
    const data = await requestJson('/api/dashboard/inspection')
    return normalizeInspectionInfo(data)
  }

  return wait(normalizeInspectionInfo(mockInspectionInfo))
}

export async function getRecognitionReport(type) {
  if (!DASHBOARD_CONFIG.useMock) {
    const data = await requestJson(`/api/dashboard/report?type=${encodeURIComponent(type)}`)
    return normalizeReport(data)
  }

  return wait(normalizeReport(mockReports[type] ?? null))
}

export async function getRecognitionTypes() {
  if (!DASHBOARD_CONFIG.useMock) {
    const data = await requestJson('/api/dashboard/recognition-types')
    return normalizeRecognitionTypes(data)
  }

  return wait(normalizeRecognitionTypes(mockRecognitionTypes))
}

export async function getSnapshots() {
  if (!DASHBOARD_CONFIG.useMock) {
    return requestJson('/api/dashboard/snapshots')
  }

  return wait(mockSnapshots)
}

export async function getStats() {
  if (!DASHBOARD_CONFIG.useMock) {
    const data = await requestJson('/api/dashboard/stats')
    return normalizeStats(data)
  }

  return wait(normalizeStats(mockStats))
}

export async function getVideoConfig() {
  if (!DASHBOARD_CONFIG.useMock) {
    const data = await requestJson('/api/dashboard/video-config')
    return normalizeVideoConfig(data)
  }

  return wait(normalizeVideoConfig(mockVideoConfig))
}
