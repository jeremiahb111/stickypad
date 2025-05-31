import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import { Toaster } from 'sonner';
import { useAuthStore } from "./stores/useAuthStore";

const App = () => {
  const { user } = useAuthStore()
  return (
    <>
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to='/login' />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to='/' />} />
        <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to='/' />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </>
  )
}
export default App