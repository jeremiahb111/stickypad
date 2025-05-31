import { Response, NextFunction, Request } from "express"
import { IRequest, IResponse } from "../interfaces"
import { LoginType, SignUpType } from "../schemas/user.schema"
import { AppError } from "../utils/appError"
import { StatusCodes } from "http-status-codes"
import { TUser, User } from "../models/user.model"
import { generateToken } from "../lib/jwt"

type UserSafe = Omit<ReturnType<TUser['toObject']>, 'password'>

export const signup = async (req: IRequest<SignUpType>, res: Response<IResponse<UserSafe>>, next: NextFunction) => {
  const isUserExist = await User.findOne({ username: req.body.username })

  if (isUserExist) throw new AppError(StatusCodes.BAD_REQUEST, 'Username is already taken')

  const user = await User.create(req.body)

  const { password, ...userWithoutPassword } = user.toObject()

  generateToken(user._id.toString(), res)

  return res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'User created successfully',
    data: userWithoutPassword
  })
}

export const login = async (req: IRequest<LoginType>, res: Response<IResponse<UserSafe>>, next: NextFunction) => {
  const user = await User.findOne({ username: req.body.username })

  if (!user || !(await user.comparePassword(req.body.password))) throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid credentials')

  const { password, ...userWithoutPassword } = user.toObject()

  generateToken(user._id.toString(), res)

  return res.status(StatusCodes.OK).json({
    success: true,
    message: 'User logged in successfully',
    data: userWithoutPassword
  })
}

export const logout = async (req: Request, res: Response<IResponse>, next: NextFunction) => {
  return res.clearCookie('session').status(StatusCodes.OK).json({ success: true, message: 'User logged out successfully' })
}