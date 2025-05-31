import { Request } from "express"
import { TUser } from "../models/user.model"

export interface IRequest<B extends object = {}, P extends object = {}, Q extends object = {}> extends Request<P, any, B, Q> {
  user?: Omit<ReturnType<TUser['toObject']>, 'password'>
}

export interface IResponse<T = null> {
  success: boolean,
  message: string,
  data?: T
} 