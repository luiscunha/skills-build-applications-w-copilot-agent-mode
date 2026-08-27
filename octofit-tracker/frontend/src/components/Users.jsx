import { useEffect, useState } from 'react'

import { getApiBaseUrl, normalizePayload } from '../utils/api'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadUsers() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch users (${response.status})`)
        }

        const payload = await response.json()
        setUsers(normalizePayload(payload))
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

    loadUsers()

    return () => controller.abort()
  }, [])

  if (loading) return <div className="alert alert-info">Loading users...</div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-3">Users</h2>
        <div className="list-group">
          {users.map((user) => (
            <div key={user.id ?? user._id ?? user.email} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">{user.name}</h5>
                  <p className="mb-1 text-muted">{user.email}</p>
                </div>
                <span className="badge bg-primary">{user.fitnessLevel ?? user.level ?? 'member'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
