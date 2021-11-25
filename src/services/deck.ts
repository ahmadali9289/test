import db from 'db'
import format from 'pg-format'

export interface IDeck {
  deck_id: string
  deck_type: string
  shuffled: boolean
  remaining: number
}

export const postDeck = async (
  type: string,
  shuffle: boolean,
  totalCards: number = 52
): Promise<IDeck | undefined> => {
  const client = await db.pool.connect()
  try {
    const query = format(`INSERT INTO deck(
      deck_id,
      deck_type,
      shuffled,
      remaining
    ) VALUES (uuid_generate_v4(), %L , %L , %L ) RETURNING *;
    `, type, shuffle, totalCards);
    const result = await db.pool.query(query)

    return result.rows[0]
  } catch (err) {
    console.error('insertion failed', err)
  } finally {
    client.release()
  }
}

export const getDeck = async (deckId: string): Promise<IDeck | undefined> => {
  const client = await db.pool.connect()
  try {
    const query = format(`SELECT * FROM deck where deck_id = %L;`, deckId);
    const result = await db.pool.query(query)
    
    return result.rows[0]
  } catch (err) {
    console.error('Was not able to get the record', err)
  } finally {
    client.release()
  }
}
