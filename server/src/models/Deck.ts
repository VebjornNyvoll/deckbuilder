import { Schema } from 'mongoose';
import { IDeck } from '../interfaces/deck';
import { cardSchema } from './Card.js';

const deckSchema = new Schema<IDeck>({
  deckName: { type: String, required: false },
  cards: { type: [cardSchema], required: false },
});

export { deckSchema };
