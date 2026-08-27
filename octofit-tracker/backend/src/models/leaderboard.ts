import mongoose, { Schema, model, type InferSchemaType } from 'mongoose'

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    points: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true },
    streak: { type: Number, default: 0 },
  },
  { timestamps: true },
)

export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>

export const LeaderboardEntry = model<LeaderboardDocument>('LeaderboardEntry', leaderboardSchema)
