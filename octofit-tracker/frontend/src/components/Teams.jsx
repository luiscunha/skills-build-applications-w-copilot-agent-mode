import { useEffect, useState } from 'react'

import { getApiBaseUrl, normalizePayload } from '../utils/api'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadTeams() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch teams (${response.status})`)
        }

        const payload = await response.json()
        setTeams(normalizePayload(payload))
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

    loadTeams()

    return () => controller.abort()
  }, [])

  if (loading) return <div className="alert alert-info">Loading teams...</div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-3">Teams</h2>
        <div className="list-group">
          {teams.map((team) => (
            <div key={team.id ?? team._id ?? team.name} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">{team.name}</h5>
                  <p className="mb-1 text-muted">{team.goal}</p>
                </div>
                <span className="badge bg-warning text-dark">{team.members?.length ?? team.members ?? 0} members</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
