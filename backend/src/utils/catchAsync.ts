import { Request, Response, NextFunction, RequestHandler } from 'express'

type AsyncHanlder = (req: Request, res: Response, next: NextFunction) => Promise<Response>

export const catchAsync = (controller: AsyncHanlder): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    controller(req, res, next).catch(next)
  }
}