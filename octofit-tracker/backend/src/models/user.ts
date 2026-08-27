import mongoose, { Schema, model, type InferSchemaType } from 'mongoose'

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    fitnessLevel: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    team: { type: String, default: 'Unassigned' },
  },
  { timestamps: true },
)

export type UserDocument = InferSchemaType<typeof userSchema>

export const User = model<UserDocument>('User', userSchema)
