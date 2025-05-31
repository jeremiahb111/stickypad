import { axiosInstance } from "./axios";

export const api = {
  user: {
    login: async (loginPayload: { username: string, password: string }) => {
      const res = await axiosInstance.post('/user/login', loginPayload)

      return res.data
    },
    signup: async (signupPayload: { username: string, email: string, password: string, confirmPassword: string }) => {
      const res = await axiosInstance.post('/user/signup', signupPayload)

      return res.data
    },
    logout: async () => {
      const res = await axiosInstance.post('/user/logout')

      return res.data
    }
  },
  note: {
    getNotes: async () => {
      const res = await axiosInstance.get('/note')

      return res.data
    },
    deleteNoteById: async (noteId: string) => {
      const res = await axiosInstance.delete(`/note/${noteId}`)

      return res.data
    },
    createNote: async (notePayload: { content: string }) => {
      const res = await axiosInstance.post('/note', notePayload)

      return res.data
    },
    updateNoteById: async (notePayload: { noteId: string, content: string }) => {
      const res = await axiosInstance.put(`/note/${notePayload.noteId}`, notePayload)

      return res.data
    }
  }
}
