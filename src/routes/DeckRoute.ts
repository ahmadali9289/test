import express, { Request, Response } from 'express'
import { deck, card } from '../controllers'

const router = express.Router()

router.post('/deck', async (req: Request, res: Response) => {
    console.log('BODY: ', req.body)
    const { type, shuffle } = req.body
    const result = await deck.creatDeck(type, shuffle)
    console.log(result)
    res.send(result)
  })
  
  router.get('/deck/:deckId', async (req: Request, res: Response) => {
    const result = await deck.openDeck(req.params.deckId)
    console.log(result)
    res.send(result)
  })
  
  router.get('/deck/:deckId/:drawCount', async (req: Request, res: Response) => {
    const {drawCount} = req.params
    if (!drawCount && parseInt(drawCount) <= 0 || parseInt(drawCount) >= 52) {
        throw new Error("Cards to draw can only be between 1-51 at max")        
    }
    const result = await card.drawDeck(req.params.deckId, parseInt(drawCount))
    console.log(result)
    res.send(result)
  })
  
  export {
      router as DeckRoute
  }