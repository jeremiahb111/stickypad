const NotFound = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-4">
        <img src="/404.png" alt="404" className="sm:size-96 size-80" />
        <h2 className="text-lg sm:text-xl font-semibold">Looks like you haven’t added any notes yet.</h2>
      </div>
    </div>
  )
}
export default NotFound