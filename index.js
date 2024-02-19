import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import sequelize from './db.js'
import { router } from './routes/index.js'
import { errorHandler } from './middleware/ErrorHandlingMiddleware.js'
import { __dirname } from './consts/__driname.js'

config({ path: './.env' })

const PORT = process.env.PORT || 5001

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()

    app.listen(PORT, () => {
      console.log('STARTED ' + PORT)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
