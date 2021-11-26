import express from 'express'
import { deck, card } from '../controllers'

const router = express.Router()

router.post('/', deck.creatDeck)

router.get('/:deckId', deck.openDeck)

router.get('/:deckId/:drawCount', card.drawDeck)

export { router as DeckRoute }