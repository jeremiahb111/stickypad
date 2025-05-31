import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLoginMutation } from "@/hooks/useAuth"
import { useState } from "react"
import { Link } from "react-router-dom"

interface ILogin {
  username: string
  password: string
}

const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState<ILogin>({
    username: '',
    password: ''
  })

  const { loginMutation, isPending } = useLoginMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginInfo({ ...loginInfo, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    loginMutation(loginInfo)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background px-4 overflow-hidden">
      <div className="w-full max-w-md border rounded-md p-6 bg-white dark:bg-zinc-900">
        <h1 className="text-2xl text-center font-semibold">Login</h1>
        <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="username">Username:</Label>
            <Input
              type="text"
              id="username"
              name="username"
              placeholder="john.doe"
              value={loginInfo.username}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="******"
              value={loginInfo.password}
              onChange={handleChange}
            />
          </div>
          <Button
            type="submit"
            className="w-full hover:cursor-pointer"
            disabled={isPending || (loginInfo.username.trim() === '' && loginInfo.password.trim() === '')}
          >
            Login
          </Button>
          <p className="text-center">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="font-semibold hover:underline">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
