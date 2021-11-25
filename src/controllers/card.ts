import { IDeck } from 'services/deck';
import {cardService, deckService} from '../services'
import _ from 'lodash'
import {v4 as uuidv4} from 'uuid'
import { ICard } from 'services/card';

const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];


export const drawDeck = async (deckId: string, drawCount: number): Promise<ICard[] | undefined> => {
    const result: (ICard[] | undefined) = await cardService.drawCardsFromDeck(deckId, drawCount)

    if (!result) {
        throw new Error("Could not get record");        
    }

    return result;
}
