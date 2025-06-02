import { api } from "@/lib/api"
import { useAuthStore } from "@/stores/useAuthStore"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import { toast } from "sonner"

export const useGetNotes = () => {
  const { user } = useAuthStore()
  const { data, isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: () => api.note.getNotes(),
    retry: false,
    enabled: !!user
  })

  return { data, isLoading }
}

export const useDeleteNoteById = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: deleteNote, isPending } = useMutation({
    mutationFn: api.note.deleteNoteById,
    onSuccess: () => {
      toast.success('Note deleted successfully!', { duration: 3000 })
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ message: string }>
      toast.error(axiosError?.response?.data.message, { duration: 3000 })
    }
  })

  return { deleteNote, isPending }
}

export const useCreateNote = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient()

  const { mutateAsync: createNote, isPending, isSuccess } = useMutation({
    mutationFn: api.note.createNote,
    onSuccess: () => {
      toast.success('Note created successfully!', { duration: 3000 })
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      onSuccessCallback()
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ message: string }>
      const message = axiosError?.response?.data.message.includes('Validation') ? 'Content must be atleast 10 characters long and atmost 255 characters long.' : axiosError?.response?.data.message
      toast.error(message, { duration: 3000 })
    }
  })

  return { createNote, isPending, isSuccess }
}

export const useUpdateNoteById = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient()

  const { mutateAsync: updateNote, isPending } = useMutation({
    mutationFn: api.note.updateNoteById,
    onSuccess: () => {
      toast.success('Note updated successfully!', { duration: 3000 })
      onSuccessCallback()
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ message: string }>
      const message = axiosError?.response?.data.message.includes('Validation') ? 'Content must be atleast 10 characters long and atmost 255 characters long.' : axiosError?.response?.data.message
      toast.error(message, { duration: 3000 })
    }
  })

  return { updateNote, isPending }
}