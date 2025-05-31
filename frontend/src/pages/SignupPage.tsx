import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSignupMutation } from "@/hooks/useAuth"
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

interface ISignup {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const SignupPage = () => {
  const [signupInfo, setSignupInfo] = useState<ISignup>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const { signupMutation, isPending } = useSignupMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSignupInfo({ ...signupInfo, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (signupInfo.password !== signupInfo.confirmPassword) {
      return toast.error('Passwords do not match', { duration: 3000 })
    }

    signupMutation(signupInfo)
  }

  return (
    <div className="fixed inset-0 flex items-center bg-background justify-center px-4">
      <div className="w-full max-w-md border rounded-md p-4 dark:bg-zinc-900">
        <div className="flex flex-col space-y-6 w-full justify-center">
          <h1 className="text-2xl font-semibold text-center">Sign Up</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <Label htmlFor="username">Username:</Label>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="john.doe"
                value={signupInfo.username}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="email">Email:</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="john.doe@gmail.com"
                value={signupInfo.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="password">Password:</Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="******"
                value={signupInfo.password}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="confirmPassword">Confirm Password:</Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="******"
                value={signupInfo.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              className="w-full mt-2 hover:cursor-pointer"
              disabled={isPending || (signupInfo.password.trim() === '' && signupInfo.confirmPassword.trim() === '' && signupInfo.email.trim() === '' && signupInfo.username.trim() === '')}
            >
              Sign Up
            </Button>

            <div className="text-center">
              <p>
                Already have an account? {' '}
                <Link to="/login" className="hover:underline font-semibold">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default SignupPage