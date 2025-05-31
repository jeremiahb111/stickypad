import { create } from 'zustand'
import { api } from '@/lib/api'

type Response = Awaited<ReturnType<typeof api.user.login>>
type User = Response['data']

interface AuthState<T> {
  user: T | null
  authUser: (user: T) => void
  logout: () => void
}

export const useAuthStore = create<AuthState<User>>(set => ({
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
  authUser: (user: User) => set({ user }),
  logout: () => set({ user: null }),
}))