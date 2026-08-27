import { useEffect, useState } from 'react'

import { getApiBaseUrl, normalizePayload } from '../utils/api'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : `${getApiBaseUrl()}/api/activities/`

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadActivities() {
      try {
        const response = await fetch(activitiesEndpoint, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch activities (${response.status})`)
        }

        const payload = await response.json()
        setActivities(normalizePayload(payload))
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

    loadActivities()

    return () => controller.abort()
  }, [])

  if (loading) return <div className="alert alert-info">Loading activities...</div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-3">Activities</h2>
        <div className="list-group">
          {activities.map((activity) => (
            <div key={activity.id ?? activity._id ?? `${activity.type}-${activity.date}`} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">{activity.type}</h5>
                  <p className="mb-1 text-muted">{activity.date}</p>
                </div>
                <span className="badge bg-success">{activity.durationMinutes ?? activity.duration ?? 0} min</span>
              </div>
              <small className="text-muted">{activity.caloriesBurned ?? activity.calories ?? 0} calories</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
