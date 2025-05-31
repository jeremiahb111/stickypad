import { connect } from 'mongoose'

export const connectDB = async () => {
  try {
    const conn = await connect(process.env.MONGODB_URI!, {
      dbName: 'sticky_db'
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error('Error connecting to database')
    process.exit(1)
  }
}