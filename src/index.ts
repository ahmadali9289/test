import express, { Request, Response } from 'express'
import db from 'db'

import {card, deck} from './controllers'

const PORT = process.env.PORT || 3001

const app = express()

app.post('/deck', async (req: Request, res: Response) => {
  const { type, shuffle } = req.body
  const result = await deck.creatDeck("FULL", false)
  console.log(result)
  res.send(result)
})

app.get('/deck/:deckId', async (req: Request, res: Response) => {
  const result = await deck.openDeck(req.params.deckId)
  console.log(result)
  res.send(result)
})

app.get('/deck/:deckId/:drawCount', async (req: Request, res: Response) => {
  const result = await card.drawDeck(req.params.deckId, parseInt(req.params.drawCount))
  console.log(result)
  res.send(result)
})

app.get('/', (req: Request, res: Response) => {
  res.send('hello')
})

app.listen(PORT, () => {
  console.log(`app runnin on port ${PORT}`)
  db.runMigrations()
})

export default app