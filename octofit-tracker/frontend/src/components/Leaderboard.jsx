import { useEffect, useState } from 'react'

import { getApiBaseUrl, normalizePayload } from '../utils/api'

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadLeaderboard() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch leaderboard (${response.status})`)
        }

        const payload = await response.json()
        setLeaders(normalizePayload(payload))
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadLeaderboard()

    return () => controller.abort()
  }, [])

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-3">Leaderboard</h2>
        <div className="list-group">
          {leaders.map((entry) => (
            <div key={entry.rank ?? entry.name} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <span className="badge bg-dark me-2">#{entry.rank ?? 0}</span>
                {entry.name}
              </div>
              <strong>{entry.points ?? 0} pts</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
