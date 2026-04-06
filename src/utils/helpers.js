export function getMarkerByLabel(markers, label) {
  return markers.find((marker) => marker.label === label) ?? null
}
