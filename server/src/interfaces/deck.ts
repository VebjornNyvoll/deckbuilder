import { ICard } from './card';

interface IDeck {
  _id?: string;
  deckName: string;
  cards: ICard[];
}
export { IDeck };
