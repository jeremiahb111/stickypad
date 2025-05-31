import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(6, 'Username must be at least 3 characters long').max(20, 'Username must be at most 20 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long').max(20, 'Password must be at most 20 characters long'),
})

export const signupSchema = loginSchema
  .merge(z.object({
    email: z.string().email('Invalid email address'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters long').max(20, 'Password must be at most 20 characters long'),
  }))
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

export type SignUpType = z.infer<typeof signupSchema>
export type LoginType = z.infer<typeof loginSchema>