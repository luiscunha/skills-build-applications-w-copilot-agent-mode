import assert from 'node:assert/strict'
import { describe, it, before, after } from 'node:test'
import type { AddressInfo } from 'node:net'

import { connectDatabase, disconnectDatabase } from './config/database.js'
import { createApp } from './index.js'

describe('OctoFit API routes', () => {
  before(async () => {
    await connectDatabase()
  })

  after(async () => {
    await disconnectDatabase()
  })

  it('serves the expected API endpoints', async () => {
    const app = createApp()
    const server = app.listen(0)

    await new Promise<void>((resolve) => {
      server.once('listening', () => resolve())
    })

    const port = (server.address() as AddressInfo).port
    const routes = [
      '/api/health',
      '/api/users/',
      '/api/teams/',
      '/api/activities/',
      '/api/leaderboard/',
      '/api/workouts/',
    ]

    for (const path of routes) {
      const response = await fetch(`http://127.0.0.1:${port}${path}`)
      assert.equal(response.ok, true, `Expected ${path} to return OK`)
      const payload = await response.json()
      assert.ok(payload)
    }

    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error)
          return
        }

        resolve()
      })
    })
  })
})
