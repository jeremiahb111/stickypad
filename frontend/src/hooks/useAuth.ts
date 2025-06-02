import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const useLoginMutation = () => {
  const { authUser } = useAuthStore()

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: api.user.login,
    onSuccess: ({ data }) => {
      authUser(data)
      localStorage.setItem('user', JSON.stringify(data))
      toast.success('Login successfully!', {
        duration: 3000
      })
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ message: string }>
      toast.error(axiosError?.response?.data.message, {
        duration: 3000
      })
    }
  })

  return { loginMutation, isPending }
}

export const useSignupMutation = () => {
  const { authUser } = useAuthStore()

  const { mutate: signupMutation, isPending } = useMutation({
    mutationFn: api.user.signup,
    onSuccess: ({ data }) => {
      authUser(data)
      localStorage.setItem('user', JSON.stringify(data))
      toast.success('Signup successfully!', {
        duration: 3000
      })
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ message: string }>
      toast.error(axiosError?.response?.data.message, {
        duration: 3000
      })
    }
  })

  return { signupMutation, isPending }
}

export const useLogout = () => {
  const { logout } = useAuthStore()

  const { mutate: logoutMutation } = useMutation({
    mutationFn: api.user.logout,
    onSuccess: () => {
      logout()
      localStorage.removeItem('user')
      toast.success('Logout Successfully!', {
        duration: 3000
      })
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ message: string }>
      toast.error(axiosError?.response?.data.message, {
        duration: 3000
      })
    }
  })

  return { logoutMutation }
}