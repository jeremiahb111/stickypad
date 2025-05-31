import express, { Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import consoleStamp from 'console-stamp'
import path from 'path'
import { config } from 'dotenv'

import { errorHandler } from './middlewares/errorHandler'
import { connectDB } from './lib/mongoose'

import userRoutes from './routes/user.route'
import noteRoutes from './routes/note.route'

config()
consoleStamp(console, {
  format: ':date(mm/dd/yyyy HH:MM:s) :label',
})

const app = express()
const PORT = process.env.PORT || 5000
const dirname = path.resolve()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}))

app.use('/api/user', userRoutes)
app.use('/api/note', noteRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(dirname, '../frontend/dist')))

  app.get(/.*/, (req: Request, res: Response) => {
    res.sendFile(path.join(dirname, '../frontend', 'dist', 'index.html'))
  })
}

app.use(errorHandler)

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`)
  await connectDB()
})
