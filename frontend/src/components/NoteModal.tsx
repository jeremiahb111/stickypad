import { XIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { useState } from "react"
import { useCreateNote, useUpdateNoteById } from "@/hooks/useNote"
import type { Note } from "@/pages/HomePage"

const NoteModal = ({ setOpenModal, note }: { setOpenModal: React.Dispatch<React.SetStateAction<boolean>>, note: Note | null }) => {
  const [content, setContent] = useState<string>(note ? note.content : '')
  const { createNote, isPending } = useCreateNote(setOpenModal)
  const { updateNote } = useUpdateNoteById(setOpenModal)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (note && content.trim() !== '') {
      updateNote({ noteId: note._id, content })
    } else {
      createNote({ content })
    }
  }

  const closeModal = () => {
    setContent('')
    setOpenModal(false)
  }

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
      <div className="relative w-full max-w-md border rounded-md p-6 bg-white dark:bg-zinc-900">
        <h1 className="text-xl text-center font-semibold">Note</h1>
        <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Textarea
              id="content"
              name="content"
              placeholder="What's on your mind?"
              className="resize-none h-32"
              onChange={(e) => setContent(e.target.value)}
              rows={100}
              cols={50}
              required
              value={content}
            />
          </div>
          <Button
            className="w-full cursor-pointer"
            disabled={isPending || content.trim() === ''}
            type="submit"
          >
            Submit
          </Button>
        </form>
        <XIcon
          className="absolute top-4 right-4 cursor-pointer size-5 bg-transparent hover:bg-zinc-500 hover:rounded-full"
          onClick={closeModal}
        />
      </div>
    </div>
  )
}
export default NoteModal