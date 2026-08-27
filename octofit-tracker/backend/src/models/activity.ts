import mongoose, { Schema, model, type InferSchemaType } from 'mongoose'

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, required: true },
    notes: { type: String, default: '' },
  },
  { timestamps: true },
)

export type ActivityDocument = InferSchemaType<typeof activitySchema>

export const Activity = model<ActivityDocument>('Activity', activitySchema)
