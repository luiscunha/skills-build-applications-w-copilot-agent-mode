import { createApp } from './index.js'
import { connectDatabase } from './config/database.js'

const app = createApp()
const port = Number(process.env.PORT) || 8000
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

async function startServer() {
  await connectDatabase()
  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit Tracker API listening on port ${port}`)
    console.log(`Codespaces-aware API base URL: ${baseUrl}`)
  })
}

void startServer()

export default app
