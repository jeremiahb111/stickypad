import { Loader } from "lucide-react"

const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  )
}
export default PageLoader