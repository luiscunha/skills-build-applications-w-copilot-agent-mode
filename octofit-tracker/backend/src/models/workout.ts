import mongoose, { Schema, model, type InferSchemaType } from 'mongoose'

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, required: true },
    focusArea: { type: String, required: true },
    equipment: { type: [String], default: [] },
  },
  { timestamps: true },
)

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>

export const Workout = model<WorkoutDocument>('Workout', workoutSchema)
