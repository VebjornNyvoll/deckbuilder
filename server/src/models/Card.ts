import { Schema, model } from 'mongoose';
import { ICard } from '../interfaces/card.js';
import { IMechanics } from '../interfaces/mechanics.js';

const cardSchema = new Schema<ICard>({
  cardId: { type: String, required: false },
  dbfId: { type: Number, required: false },
  name: { type: String, required: false },
  cardSet: { type: String, required: false },
  type: { type: String, required: false },
  text: { type: String, required: false },
  playerClass: { type: String, required: false },
  locale: { type: String, required: false },
  faction: { type: String, required: false },
  mechanics: { type: [{ type: Schema.Types.Mixed as IMechanics }], required: false },
  cost: { type: Number, required: false },
  attack: { type: Number, required: false },
  health: { type: Number, required: false },
  flavour: { type: String, required: false },
  artist: { type: String, required: false },
  elite: { type: Boolean, required: false },
  rarity: { type: String, required: false },
  spellSchool: { type: String, required: false },
  race: { type: String, required: false },
  img: { type: String, required: false },
  durability: { type: Number, required: false },
  collectible: { type: String, required: false },
  imgGold: { type: String, required: false },
  otherRaces: { type: String, required: false },
  howToGetSignature: { type: String, required: false },
  armor: { type: String, required: false },
  howToGet: { type: String, required: false },
  howToGetGold: { type: String, required: false },
  howToGetDiamond: { type: String, required: false },
  multiClassGroup: { type: String, required: false },
  classes: { type: [String], required: false },
});

const Cards = model<ICard>('Card', cardSchema);
export { Cards, cardSchema };
