import express, { Request, Response } from 'express'

import { DeckRoute } from './DeckRoute'

const router = express.Router()

router.use('/deck', DeckRoute)


export {
    router as routes
}