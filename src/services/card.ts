import db from 'db'
import format from 'pg-format'

export interface ICard {        
    card_id: string,
    deck_id: string,
    card_value: string,
	suite: string,
	code: string,
	iswithdrawn: boolean
}

export const postCards = async (card: any) : Promise<void> => {
    const client = await db.pool.connect()
		try {
			const result = await db.pool.query(`INSERT INTO card (card_id, deck_id, card_value, suite, code, iswithdrawn) VALUES ${card}`)
            console.log('insertion of cards was successfull...', result)
		} catch (err) {
			console.error('insertion failed', err)
		}
		finally {
			client.release()
		}

}

export const updateWithDrawCard = async (cards: any) : Promise<void> => {
    const client = await db.pool.connect()
		try {
            const result = await db.pool.query(`UPDATE card SET iswithdrawn=TRUE WHERE card_id in (${cards})`)
            console.log('updating of cards was successfull...', result)
		} catch (err) {
			console.error('update failed', err)
		}
		finally {
			client.release()
		}

}

export const getCardsFromDeckId = async (deckId: string) : Promise<ICard[] | undefined> => {
    const client = await db.pool.connect()
		try {
            const result = await db.pool.query(`
            SELECT * FROM card where "card"."deck_id"= '${deckId}' and "card"."iswithdrawn"=false
              `)
            console.log('Got the result ...', result.rows)
            return result.rows;
		} catch (err) {
			console.error('insertion failed', err)
		}
		finally {
			client.release()
		}

}

export const drawCardsFromDeck = async (deckId: string, drawCount: number) : Promise<ICard[] | undefined> => {
    const client = await db.pool.connect()
		try {
            const result = await db.pool.query(`
            SELECT * FROM card where "card"."deck_id"= '${deckId}' and "card"."iswithdrawn"=false
              `)
			const cards = [...result.rows]
			const drawnCards = [];

			for (let i =0; i<drawCount; i++) {
				drawnCards.push(cards.pop())
			}

			const card_ids = drawnCards.map(card => `'${card.card_id}'`).join(',')
			console.log('Only cards: ', card_ids)
			const query = format(`UPDATE card SET iswithdrawn=TRUE WHERE card_id in (%s)`, card_ids);
			await db.pool.query(query)
			const query_deck = format(`UPDATE deck SET remaining=remaining-1 WHERE deck_id='${deckId}'`);
			await db.pool.query(query_deck)
			console.log('Drawn cards: ', drawnCards);
            return drawnCards;
		} catch (err) {
			console.error('draw cards failed', err)
		}
		finally {
			client.release()
		}

}