require('dotenv').config()
const express = require('express')
const app = express()

const cors = require('cors')
const PORT = process.env.PORT || 5000
const connectToDB = require('./connectToDB')
const errorHandler = require('./errorhandlers/errorHandler')
const notFoundHandler = require('./errorhandlers/notFoundHandler')
const authRouter = require('./routers/authRouter')
const userRouter = require('./routers/userRouter')
const auth = require('./middelware/auth')

app.use(express.json())
app.use(cors())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', auth, userRouter)

app.use(notFoundHandler)
app.use(errorHandler)

const start = async () => {
    try {
      await connectToDB(process.env.MONGO_URI);
      app.listen(PORT, () =>
        console.log(`Server is listening on port ${PORT}...`)
      );
    } catch (e) {
        console.log("Connection error.")
        console.log(e.message)
    }
  }

start()
