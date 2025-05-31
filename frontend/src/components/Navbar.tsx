import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { LogInIcon, LogOutIcon, MenuIcon, UserPlus2 } from "lucide-react" // or your custom icon
import { Link } from "react-router-dom"
import { useState } from "react"
import { useAuthStore } from "@/stores/useAuthStore"
import { useLogout } from "@/hooks/useAuth"

const Navbar = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false)
  const { user } = useAuthStore()
  const { logoutMutation } = useLogout()

  const handleSideNav = () => {
    setSideNavOpen(false)
  }

  const handleSideNavLogout = () => {
    setSideNavOpen(false)
    logoutMutation()
  }

  return (
    <div className="sticky top-0 z-50 w-full border-b border-neutral-700 p-4 bg-background">
      <div className="flex items-center justify-between container mx-auto">
        {/* Navigation links - visible on medium and larger screens */}
        <div className="w-full flex items-center justify-between py-2">
          <h1 className="text-3xl font-bold">Stickypad</h1>
          <nav className="hidden md:flex gap-6">
            {user && <Button variant={"secondary"} className="hover:cursor-pointer" onClick={() => logoutMutation()}>
              <LogOutIcon className="size-4" /> Logout
            </Button>}
            {
              !user && (
                <>
                  <Link to="/login" className="hover:underline">Login</Link>
                  <Link to="/signup" className="hover:underline">Signup</Link></>
              )
            }
          </nav>
        </div>

        {/* Hamburger menu - visible only on small screens */}
        <Sheet open={sideNavOpen} onOpenChange={setSideNavOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="block md:hidden size-10">
              <MenuIcon className="size-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-65 [&>button:last-child]:hidden">
            <SheetHeader className="border-b border-neutral-700">
              <SheetTitle className="font-bold text-3xl p-2">Stickypad</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-7 px-6">
              {user && <Button variant={"secondary"} className="hover:cursor-pointer" onClick={handleSideNavLogout}>
                <LogOutIcon className="size-4" /> Logout
              </Button>}
              {
                !user && (
                  <>
                    <Link to="/login" className="hover:underline font-semibold flex items-center gap-3" onClick={handleSideNav}>
                      <LogInIcon className="size-5" /> Login
                    </Link>
                    <Link to="/signup" className="hover:underline font-semibold flex items-center gap-3" onClick={handleSideNav}>
                      <UserPlus2 className="size-5" /> Sign Up
                    </Link>
                  </>
                )
              }
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default Navbar
