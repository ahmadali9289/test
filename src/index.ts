import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import db from 'db'

import {card, deck} from './controllers'
import morganMiddleware from './middleware/morganMiddleware'
import { routes } from './routes/index';
import { errorHandler } from 'middleware/error.middleware'
import { notFoundHandler } from 'middleware/not-found.middleware'

const PORT = process.env.PORT || 3001

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(morganMiddleware)

app.use('/api', routes)

app.get('/health-check', (req: Request, res: Response) => {
  res.send('Server is up and running')
})

// app.use((error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
//   console.log('Path: ', req.path)
//   console.error('Error ==> ', error)
  
//   res.status(500).send({message: error})
// })

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`app runnin on port ${PORT}`)
  db.runMigrations()
})

export default app