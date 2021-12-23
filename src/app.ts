import express from 'express'
import cors from 'cors'
const app = express()

const port = process.env.PORT || 5005

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res, next) => {
  res.status(200).send('Hello this is API from Express')
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
