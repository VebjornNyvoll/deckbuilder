import { IDeck } from './deck';
interface IUser {
  id: String;
  username: String;
  password: String;
  decks: [IDeck];
}

export { IUser };
