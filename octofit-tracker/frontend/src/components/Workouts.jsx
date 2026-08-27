import { useEffect, useState } from 'react'

import { getApiBaseUrl, normalizePayload } from '../utils/api'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : `${getApiBaseUrl()}/api/workouts/`

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadWorkouts() {
      try {
        const response = await fetch(workoutsEndpoint, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch workouts (${response.status})`)
        }

        const payload = await response.json()
        setWorkouts(normalizePayload(payload))
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

    loadWorkouts()

    return () => controller.abort()
  }, [])

  if (loading) return <div className="alert alert-info">Loading workouts...</div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-3">Workouts</h2>
        <div className="list-group">
          {workouts.map((workout) => (
            <div key={workout.id ?? workout._id ?? workout.title} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">{workout.title}</h5>
                  <p className="mb-1 text-muted">{workout.category ?? workout.focusArea}</p>
                </div>
                <span className="badge bg-info text-dark">{workout.difficulty}</span>
              </div>
              <small className="text-muted">{workout.durationMinutes ?? workout.minutes ?? 0} minutes</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
