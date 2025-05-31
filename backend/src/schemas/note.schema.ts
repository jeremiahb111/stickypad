import { z } from 'zod'

export const noteSchema = z.object({
  content: z.string().min(10, 'Note must be at least 10 characters long').max(255, 'Note must be at most 255 characters long'),
})

export type TNoteSchema = z.infer<typeof noteSchema>