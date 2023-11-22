import { IUser } from './user';
interface IReview {
  cardId: string;
  text: string;
  rating: number;
  user: IUser;
}

export { IReview };
