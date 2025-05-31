import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IRequest, IResponse } from "../interfaces";
import { Note, TNote } from "../models/note.model";
import { TNoteSchema } from "../schemas/note.schema";
import { AppError } from "../utils/appError";

export const getNotes = async (req: IRequest, res: Response<IResponse<TNote[]>>, next: NextFunction) => {
  const user = req.user

  const notes = await Note.find({ author: user._id })
    .populate('author', 'username')
    .sort({ createdAt: -1 })

  return res.status(StatusCodes.OK).json({
    success: true,
    message: 'Notes fetched successfully',
    data: notes
  })
}

export const createNote = async (req: IRequest<TNoteSchema>, res: Response<IResponse<TNote>>, next: NextFunction) => {
  const user = req.user

  const note = await Note.create({ ...req.body, author: user._id })

  return res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'Note created successfully',
    data: note
  })
}

export const getNoteById = async (req: IRequest<{}, { noteId: string }>, res: Response<IResponse<TNote>>, next: NextFunction) => {
  const user = req.user
  const { noteId } = req.params

  if (!noteId) throw new AppError(StatusCodes.NOT_FOUND, 'Note id is required')

  const note = await Note.findOne({ _id: noteId, author: user._id }).populate('author', 'username')

  if (!note) throw new AppError(StatusCodes.NOT_FOUND, 'Note not found')

  return res.status(StatusCodes.OK).json({
    success: true,
    message: 'Note fetched successfully',
    data: note
  })
}

export const updateNoteById = async (req: IRequest<TNoteSchema, { noteId: string }>, res: Response<IResponse<TNote>>, next: NextFunction) => {
  const user = req.user
  const { noteId } = req.params
  const { content } = req.body

  if (!noteId) throw new AppError(StatusCodes.NOT_FOUND, 'Note id is required')

  const note = await Note.findOneAndUpdate({ _id: noteId, author: user._id }, { content }, { new: true }).populate('author', 'username createdAt')

  if (!note) throw new AppError(StatusCodes.NOT_FOUND, 'Cannot update non-existing note')

  return res.status(StatusCodes.OK).json({
    success: true,
    message: 'Note updated successfully',
    data: note
  })
}

export const deleteNoteById = async (req: IRequest<{}, { noteId: string }>, res: Response<IResponse>, next: NextFunction) => {
  const user = req.user
  const { noteId } = req.params

  if (!noteId) throw new AppError(StatusCodes.NOT_FOUND, 'Note id is required')

  const note = await Note.findOneAndDelete({ _id: noteId, author: user._id })

  if (!note) throw new AppError(StatusCodes.NOT_FOUND, 'Cannot delete non-existing note')

  return res.status(StatusCodes.OK).json({
    success: true,
    message: 'Note deleted successfully'
  })
}