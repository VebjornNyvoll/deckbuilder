import { IDeck } from './deck';
interface IUser {
  id: string;
  username: string;
  password: string;
  decks: [IDeck];
}

export { IUser };
