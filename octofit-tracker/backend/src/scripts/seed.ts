import mongoose from 'mongoose'
import { Activity } from '../models/activity.js'
import { LeaderboardEntry } from '../models/leaderboard.js'
import { Team } from '../models/team.js'
import { User } from '../models/user.js'
import { Workout } from '../models/workout.js'

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString)
    console.log('Connected to octofit_db')

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ])

    const users = await User.insertMany([
      {
        name: 'Ava Thompson',
        email: 'ava.thompson@example.com',
        age: 16,
        fitnessLevel: 'advanced',
        team: 'Trail Blazers',
      },
      {
        name: 'Milo Patel',
        email: 'milo.patel@example.com',
        age: 17,
        fitnessLevel: 'intermediate',
        team: 'Core Crew',
      },
      {
        name: 'Sofia Chen',
        email: 'sofia.chen@example.com',
        age: 15,
        fitnessLevel: 'beginner',
        team: 'Sunrise Runners',
      },
      {
        name: 'Jordan Lee',
        email: 'jordan.lee@example.com',
        age: 16,
        fitnessLevel: 'intermediate',
        team: 'Trail Blazers',
      },
    ])

    const teams = await Team.insertMany([
      {
        name: 'Trail Blazers',
        sport: 'Running',
        members: [users[0]._id, users[3]._id],
        goal: 'Increase weekly mileage and endurance',
      },
      {
        name: 'Core Crew',
        sport: 'Strength',
        members: [users[1]._id],
        goal: 'Build core stability and power',
      },
      {
        name: 'Sunrise Runners',
        sport: 'Cardio',
        members: [users[2]._id],
        goal: 'Complete monthly 5K challenge',
      },
    ])

    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Run',
        durationMinutes: 42,
        caloriesBurned: 520,
        date: new Date('2026-08-18'),
        notes: 'Tempo run with interval splits',
      },
      {
        userId: users[1]._id,
        type: 'Strength',
        durationMinutes: 38,
        caloriesBurned: 410,
        date: new Date('2026-08-19'),
        notes: 'Upper body and core circuit',
      },
      {
        userId: users[2]._id,
        type: 'Cycling',
        durationMinutes: 34,
        caloriesBurned: 390,
        date: new Date('2026-08-20'),
        notes: 'Steady-state ride',
      },
      {
        userId: users[3]._id,
        type: 'Walk',
        durationMinutes: 26,
        caloriesBurned: 210,
        date: new Date('2026-08-21'),
        notes: 'Recovery walk with mobility work',
      },
    ])

    await LeaderboardEntry.insertMany([
      {
        userId: users[0]._id,
        name: 'Ava Thompson',
        points: 980,
        rank: 1,
        streak: 12,
      },
      {
        userId: users[1]._id,
        name: 'Milo Patel',
        points: 915,
        rank: 2,
        streak: 9,
      },
      {
        userId: users[2]._id,
        name: 'Sofia Chen',
        points: 860,
        rank: 3,
        streak: 7,
      },
      {
        userId: users[3]._id,
        name: 'Jordan Lee',
        points: 820,
        rank: 4,
        streak: 6,
      },
    ])

    await Workout.insertMany([
      {
        title: 'Cardio Blast',
        category: 'Endurance',
        difficulty: 'intermediate',
        durationMinutes: 30,
        focusArea: 'Heart rate training',
        equipment: ['Jump rope', 'Timer'],
      },
      {
        title: 'Core Stability Circuit',
        category: 'Strength',
        difficulty: 'beginner',
        durationMinutes: 25,
        focusArea: 'Abs and posture',
        equipment: ['Mat'],
      },
      {
        title: 'Power Intervals',
        category: 'Athletic',
        difficulty: 'advanced',
        durationMinutes: 40,
        focusArea: 'Explosive speed',
        equipment: ['Cones', 'Timer'],
      },
    ])

    console.log('Seeded users, teams, activities, leaderboard, and workouts')
    console.log(`Inserted ${users.length} users, ${teams.length} teams, ${activities.length} activities, and 3 workouts.`)

    await mongoose.disconnect()
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
