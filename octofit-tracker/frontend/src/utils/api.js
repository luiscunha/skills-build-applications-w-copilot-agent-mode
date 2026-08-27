export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME

  if (codespaceName && codespaceName.trim() !== '') {
    return `https://${codespaceName.trim()}-8000.app.github.dev`
  }

  const codespaceHost = window.location.hostname.match(/^(.+)-5173\.app\.github\.dev$/)

  if (codespaceHost) {
    return `https://${codespaceHost[1]}-8000.app.github.dev`
  }

  return 'http://localhost:8000'
}

export function normalizePayload(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items
  }

  return []
}
