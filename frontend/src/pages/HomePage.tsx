
import NoteModal from '@/components/NoteModal'
import NotFound from '@/components/NotFound'
import PageLoader from '@/components/PageLoader'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useDeleteNoteById, useGetNotes } from '@/hooks/useNote'
import type { api } from '@/lib/api'
import { formatDistanceToNow } from 'date-fns'
import { BookmarkPlus, Loader, SquarePen, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

type Response = Awaited<ReturnType<typeof api.note.getNotes>>
export type Note = Response['data'][number]

const HomePage = () => {
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({})
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [note, setNote] = useState<Note | null>(null)

  const { data, isLoading } = useGetNotes()
  const { deleteNote } = useDeleteNoteById()

  const notes = data?.data

  const handleDelete = async (noteId: string) => {
    setLoadingMap(prevState => ({ ...prevState, [noteId]: true }))

    try {
      await deleteNote(noteId)
    } finally {
      setLoadingMap(prevState => ({ ...prevState, [noteId]: false }))
    }
  }

  const handleEditNote = (notex: Note) => {
    setNote(notex)
    setOpenModal(true)
  }

  useEffect(() => {
    if (!openModal) {
      setNote(null)
    }
  }, [openModal])

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <div className="container py-6 mx-auto flex flex-col gap-4">
      <div className='flex items-center justify-end'>
        <Button variant={"secondary"} className="text-lg p-4 cursor-pointer z-30" onClick={() => setOpenModal(true)}>
          <BookmarkPlus className='size-6' /> Add
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 bg-background">
        {!notes.length ? (
          <>
            <NotFound />
          </>
        ) : (
          notes.map((note: Note) => {
            const isLoading = loadingMap[note._id] || false
            return (
              <div key={note._id} className="card w-full bg-white dark:bg-zinc-900 shadow-xl rounded-lg p-4">
                <div className="h-full flex flex-col justify-between gap-4">
                  <h2 className="break-words whitespace-pre-wrap">{note.content}</h2>
                  <div className='flex items-center justify-between'>
                    <small className='text-zinc-400'>{formatDistanceToNow(note.createdAt)}</small>
                    {
                      isLoading ? (
                        <Loader className='size-3.5 animate-spin' />
                      ) : (
                        <div className='flex items-center justify-center gap-2 h-3'>
                          <SquarePen className='size-3.5 cursor-pointer hover:text-blue-400/90 duration-200' onClick={() => handleEditNote(note)} />
                          <Separator orientation='vertical' className='my-1 bg-gray-300 dark:bg-gray-600' />
                          <Trash2 className='size-3.5 cursor-pointer hover:text-red-400/90 duration-200' onClick={() => handleDelete(note._id)} />
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
            )
          })
        )
        }
      </div>

      {openModal && <NoteModal setOpenModal={setOpenModal} note={note} />}
    </div>
  )
}

export default HomePage