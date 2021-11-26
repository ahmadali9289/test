import express, { NextFunction, Request, Response } from 'express'
import { IDeck } from 'services/deck';
import {cardService, deckService} from '../services'
import _ from 'lodash'
import {v4 as uuidv4} from 'uuid'
import { ICard } from 'services/card';

const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];


export const drawDeck = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const {deckId, drawCount} = <{deckId: string, drawCount: string}>req.params
    try {
        if (!drawCount || parseInt(drawCount) <= 0 || parseInt(drawCount) >= 52) {
            throw new Error("Cards to draw can only be between 1-51 at max")        
        }
        const result: (ICard[] | undefined) = await cardService.drawCardsFromDeck(deckId, parseInt(drawCount))

        if (!result) {
            throw new Error("Could not get record");        
        }
    
        console.log(result)
        res.status(200).json(result);
    
    } catch (error) {
        next(error)
    }
}
