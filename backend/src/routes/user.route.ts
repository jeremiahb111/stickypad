import { Router } from 'express'
import { catchAsync } from '../utils/catchAsync'
import { login, logout, signup } from '../controllers/user.controller'
import { validate } from '../middlewares/validateRequest'
import { loginSchema, signupSchema } from '../schemas/user.schema'

const router = Router()

router.post('/signup', validate(signupSchema), catchAsync(signup))
router.post('/login', validate(loginSchema), catchAsync(login))
router.post('/logout', catchAsync(logout))

export default router