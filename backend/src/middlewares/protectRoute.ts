import { RequestHandler } from "express";
import { AppError } from "../utils/appError";
import { StatusCodes } from "http-status-codes";
import { verifyToken } from "../lib/jwt";
import { IRequest } from "../interfaces";
import { User } from "../models/user.model";

export const protectRoute: RequestHandler = async (req: IRequest, res, next) => {
  try {
    const session = req.cookies.session

    if (!session) throw new AppError(StatusCodes.UNAUTHORIZED, 'Unauthorized')

    const decoded = await verifyToken(session)

    const user = await User.findById(decoded.userId)

    if (!user) throw new AppError(StatusCodes.UNAUTHORIZED, 'Unauthorized')

    req.user = user

    next()
  } catch (error) {
    next(error)
  }
}