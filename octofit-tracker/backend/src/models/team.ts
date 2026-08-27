import mongoose, { Schema, model, type InferSchemaType } from 'mongoose'

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    sport: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    goal: { type: String, required: true },
  },
  { timestamps: true },
)

export type TeamDocument = InferSchemaType<typeof teamSchema>

export const Team = model<TeamDocument>('Team', teamSchema)
