import { Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { AppError } from '../utils/appError'
import { StatusCodes } from 'http-status-codes'

export const generateToken = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '1d' })

  res.cookie('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
  })
}

export const verifyToken = (token: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) return reject(new AppError(StatusCodes.UNAUTHORIZED, 'Invalid token'))
      return resolve(decoded as JwtPayload)
    })
  })
}