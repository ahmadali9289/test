import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import db from 'db'

import {card, deck} from './controllers'
import morganMiddleware from './middleware/morganMiddleware'
import { DeckRoute } from './routes/index';

const PORT = process.env.PORT || 3001

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(morganMiddleware)

app.use('/api', DeckRoute)

app.get('/health-check', (req: Request, res: Response) => {
  res.send('Server is up and running')
})

app.listen(PORT, () => {
  console.log(`app runnin on port ${PORT}`)
  db.runMigrations()
})

export default app