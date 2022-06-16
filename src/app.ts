import express from 'express'
import cors from 'cors'
import path from 'path'
import { routes } from './routes'
import response from './helper/response'
import config from './config/app.config.json'

const app = express()

const port = process.env.PORT || config.port || 5005

app.use(cors())

// https://stackoverflow.com/questions/7067966/how-to-allow-cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }

  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res, next) => {
  res.status(200).send({ data: 'Hello this is API from Express' })
})

// Application routing
routes(app)

app.use(response.errorHandler)

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
