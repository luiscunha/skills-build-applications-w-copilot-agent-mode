import express, { type Express } from 'express'
import { pathToFileURL } from 'node:url'

import { connectDatabase } from './config/database.js'
import { Activity } from './models/activity.js'
import { LeaderboardEntry } from './models/leaderboard.js'
import { Team } from './models/team.js'
import { User } from './models/user.js'
import { Workout } from './models/workout.js'

const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function createApp(): Express {
  const app = express()

  app.use(express.json())

  app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok', service: 'octofit-tracker-api', baseUrl })
  })

  app.get('/api/users/', async (_request, response) => {
    try {
      const users = await User.find().lean()
      response.json(users)
    } catch (error) {
      response.status(500).json({ message: 'Unable to fetch users', error: String(error) })
    }
  })

  app.get('/api/teams/', async (_request, response) => {
    try {
      const teams = await Team.find().lean()
      response.json(teams)
    } catch (error) {
      response.status(500).json({ message: 'Unable to fetch teams', error: String(error) })
    }
  })

  app.get('/api/activities/', async (_request, response) => {
    try {
      const activities = await Activity.find().lean()
      response.json(activities)
    } catch (error) {
      response.status(500).json({ message: 'Unable to fetch activities', error: String(error) })
    }
  })

  app.get('/api/leaderboard/', async (_request, response) => {
    try {
      const leaderboard = await LeaderboardEntry.find().sort({ points: -1 }).lean()
      response.json(leaderboard)
    } catch (error) {
      response.status(500).json({ message: 'Unable to fetch leaderboard', error: String(error) })
    }
  })

  app.get('/api/workouts/', async (_request, response) => {
    try {
      const workouts = await Workout.find().lean()
      response.json(workouts)
    } catch (error) {
      response.status(500).json({ message: 'Unable to fetch workouts', error: String(error) })
    }
  })

  app.get('/api', (_request, response) => {
    response.json({
      message: 'OctoFit Tracker API',
      baseUrl,
      endpoints: [
        '/api/health',
        '/api/users/',
        '/api/teams/',
        '/api/activities/',
        '/api/leaderboard/',
        '/api/workouts/',
      ],
    })
  })

  return app
}

const app = createApp()
const port = Number(process.env.PORT) || 8000

const isMainModule =
  typeof process.argv[1] === 'string' &&
  import.meta.url === pathToFileURL(process.argv[1]).href

async function startServer() {
  await connectDatabase()
  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit Tracker API listening on port ${port}`)
    console.log(`Codespaces-aware API base URL: ${baseUrl}`)
  })
}

if (isMainModule) {
  void startServer()
}

export default app
