import { InferSchemaType, Schema, model } from 'mongoose'

const noteSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true })

export type TNote = InferSchemaType<typeof noteSchema>

export const Note = model<TNote>('Note', noteSchema)