import { IDeck } from 'services/deck';
import {cardService, deckService} from '../services'
import _ from 'lodash'
import {v4 as uuidv4} from 'uuid'
import { ICard } from 'services/card';
import { shuffle } from 'utils';
import Logger from "../lib/logger";

const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];


export const creatDeck = async (type: string, shuffled: boolean): Promise<IDeck | undefined> => {
    let deck = new Array();

    if (type == "FULL") {

        for(let i = 0; i < suits.length; i++)
        {
            for(let x = 0; x < values.length; x++)
            {
                let card = { card_value: values[x], suite: suits[i], code:  values[x].toUpperCase() + suits[i].charAt(0).toUpperCase(), iswithdrawn: false};
                deck.push(card);
            }
        }
        
    }
    
    const result: (IDeck | undefined) = await deckService.postDeck(type, shuffled)

    if (!result) {
        Logger.error("Could not create record");
        throw new Error("Could not create record");        
    }

    if (shuffled) {
        deck = shuffle(deck)
    }

    if (result) {
        const { deck_id } = result;
    
        // insert the cards for the deck into `card` table with `deck_id`
        const deck_length = deck.length
        let insertion_values = ''

        _.map(deck, (d) => {
            return {
                deck_id: deck_id,
                card_id: uuidv4(),
                ...d
            }
        }).forEach((deck_obj, index: Number) => {
            const { card_id, deck_id, card_value, suite, code, iswithdrawn } = deck_obj
            insertion_values+=`('${card_id}', '${deck_id}', '${card_value}', '${suite}', '${code}', ${iswithdrawn})`
            insertion_values += index == deck_length - 1 ? '' : ','
        })
        
        await cardService.postCards(insertion_values)

    }
    Logger.info("Result for create Deck is ready");

    return result;
}

export const openDeck = async (deckId: string): Promise<IDeck | undefined> => {
    
    const result: (IDeck | undefined) = await deckService.getDeck(deckId)

    if (!result) {
        Logger.error("Could not get record");
        throw new Error("Could not get record");        
    }

    if (result) {
        const result_cards: (ICard[] | undefined) = await cardService.getCardsFromDeckId(deckId)
        _.assign(result, { cards: result_cards })
    }
    Logger.info("Result for create Deck is ready");
    return result;
}