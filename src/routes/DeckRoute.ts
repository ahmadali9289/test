import express, { NextFunction, Request, Response } from 'express'
import { deck, card } from '../controllers'

const router = express.Router()

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    console.log('BODY: ', req.body)
    try {
        const { type, shuffle } = req.body
        const result = await deck.creatDeck(type, shuffle)
        console.log(result)
        res.send(result)   
    } catch (error) {
        next(error)
    }
  })
  
  router.get('/:deckId', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await deck.openDeck(req.params.deckId)
        console.log(result)
        res.send(result)   
      } catch (error) {
          next(error)
      }
  })
  
  router.get('/:deckId/:drawCount', async (req: Request, res: Response, next: NextFunction) => {
    const {drawCount} = req.params
    try {
        if (!drawCount || parseInt(drawCount) <= 0 || parseInt(drawCount) >= 52) {
            throw new Error("Cards to draw can only be between 1-51 at max")        
        }
        const result = await card.drawDeck(req.params.deckId, parseInt(drawCount))
        console.log(result)
        res.send(result)
    
    } catch (error) {
        next(error)
    }
  })
  
  export {
      router as DeckRoute
  }