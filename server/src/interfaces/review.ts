import { IUser } from './user';
interface IReview {
  cardId: String;
  text: String;
  rating: Number;
  user: IUser;
}

export { IReview };
