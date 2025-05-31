import { ErrorRequestHandler } from "express"
import { StatusCodes } from "http-status-codes"
import { AppError } from "../utils/appError"
import { ZodError } from "zod"

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error(`[${req.method}]${req.originalUrl} - ${error.message}`)

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message
    })
  } else if (error instanceof ZodError) {
    const zodError = error.issues.map(err => {
      return {
        path: err.path[0],
        message: err.message
      }
    })

    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Validation Error',
      errors: zodError
    })
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong'
    })
  }
}