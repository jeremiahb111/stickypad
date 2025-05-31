import { Router } from "express"
import { protectRoute } from "../middlewares/protectRoute"
import { catchAsync } from "../utils/catchAsync"
import { createNote, deleteNoteById, getNoteById, getNotes, updateNoteById } from "../controllers/note.controller"
import { noteSchema } from "../schemas/note.schema"
import { validate } from "../middlewares/validateRequest"

const router = Router()

router.use(protectRoute)

router.route('/')
  .get(catchAsync(getNotes))
  .post(validate(noteSchema), catchAsync(createNote))

router.route('/:noteId')
  .get(catchAsync(getNoteById))
  .put(validate(noteSchema), catchAsync(updateNoteById))
  .delete(catchAsync(deleteNoteById))

export default router