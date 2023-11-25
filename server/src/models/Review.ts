import { Schema, model } from 'mongoose';
import { IReview } from '../interfaces/review';
import { userSchema } from './User';
const reviewSchema = new Schema<IReview>({
  cardId: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, required: true },
  user: { type: userSchema, required: false },
});

const Review = model<IReview>('Review', reviewSchema);

export { Review };
