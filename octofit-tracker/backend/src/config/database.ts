import mongoose from 'mongoose'

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

export async function connectDatabase(): Promise<typeof mongoose> {
  await mongoose.connect(connectionString)
  return mongoose
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect()
}

mongoose.connection.on('connected', () => {
  console.log('Connected to octofit_db')
})

mongoose.connection.on('error', (error) => {
  console.error('Error connecting to octofit_db:', error)
})

export default mongoose.connection
