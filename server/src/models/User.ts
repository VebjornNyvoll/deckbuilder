import { Schema, model, connect } from 'mongoose';
import { IUser } from '../interfaces/user';
import { deckSchema } from "./Deck.js"

const userSchema = new Schema<IUser>({
    username: {type: String, required: true},
    password: {type: String, required: true},
    decks: {type: [deckSchema], required: false},
})

const User = model<IUser>('User', userSchema);

export { User, userSchema };