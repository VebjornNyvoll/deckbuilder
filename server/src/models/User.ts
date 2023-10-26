import { Schema, model, connect } from 'mongoose';
import {IDeck} from "../interfaces/decks.js"


interface IUser {
    id: String,
    username: String;
    password: String;
    decks: [IDeck];
}

const userSchema = new Schema<IUser>({
    username: {type: String, required: true},
    password: {type: String, required: true},
    decks: {type: [], required: false},
})

const User = model<IUser>('User', userSchema);

export { User };