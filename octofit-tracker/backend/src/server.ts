import { createApp } from './index.js'
import { connectDatabase } from './config/database.js'

const app = createApp()
const port = Number(process.env.PORT) || 8000

async function startServer() {
  await connectDatabase()
  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit Tracker API listening on port ${port}`)
  })
}

void startServer()

export default app
