import { ICard } from './card';

interface IDeck {
  _id?: String;
  deckName: String;
  cards: ICard[];
}
export { IDeck };
