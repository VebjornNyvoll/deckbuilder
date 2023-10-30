import { User } from "./models/User.js";
import { Authenticate } from "./helpers/authentication.js";
import { Cards } from "./models/Card.js"; 
import mongoose from "mongoose";
const resolvers = {
  Query: {
    user: async (parent, args) => await User.findById(args.id),
    users: async (parent, args) => await User.find({}),
    cards:  async (parent, args) => await Cards.find({}),
    getPaginatedCards: async (parent, args) => {
      const { limit = 10, skip = 0 } = args;
      
      const cards = await Cards.find().skip(skip).limit(limit);
  
      const totalCards = await Cards.countDocuments();
      const hasNextPage = skip + limit < totalCards;
      return {
          cards,
          hasNextPage,
      };
  }
  },
  Mutation: {
    createUser: async (parent, args) => {
      const payload = {
        id: null,
        username: null,
        password: null,
        decks: null,
        error: { message: "No error occured", error: false },
      };
      const user = await User.findOne({ username: args.username });
      if (user) {
        payload.error.message = "User already exists";
        payload.error.error = true;
        return payload;
      }

      const password = await Authenticate.hash(args.password);
      if (password.error) {
        payload.error.message = "An error has occured occured";
        payload.error.error = true;
        return payload;
      } else {
        const newUser = new User({
          username: args.username,
          password: password.result,
          decks: [],
        });
        await newUser.save();
        payload.username = newUser.username;
        payload.decks = newUser.decks;
        payload.id = newUser.id;
        return payload;
      }
    },

    login: async (parent, args, contextValue) => {
      const payload = {
        token: null,
        user: null,
        error: { message: "No error occured", error: false },
      };

      if (!contextValue.error) {
        payload.error.message = "User already logged in";
        payload.error.error = true;
        payload.user = await User.findById(contextValue.result);
        return payload;
      }

      const user = await User.findOne({ username: args.username });

      if (!user) {
        payload.error.error = true;
        payload.error.message = "User does not exist";
        return payload;
      }

      const valid = await Authenticate.verify(args.password, user.password);

      if (valid.error) {
        payload.error.message = "Invalid password";
        payload.error.error = true;
        return payload;
      }

      const token = Authenticate.createToken(user.id);
      if (token.error) {
        payload.error.error = true;
        payload.error.message = "Could not create token";
        return payload;
      } else {
        payload.token = token.result;
        payload.user = user;
        return payload;
      }
    },

    addCards: async (parent, args, contextValue) => {
      const payload = {
          id: null,
          username: null,
          decks: null,
          error: { message: "No error occurred", error: false },
      };
  
      try {
          if (contextValue.error) {
              payload.error.message = "Could not authorize user!";
              payload.error.error = true;
              return payload;
          }
  
          // Fetching the card documents that you want to add
          const cardsToAdd = await Cards.find({
              _id: { $in: args.cardIds }
          });
  
          // Validate if cards were found
          if (!cardsToAdd.length) {
              throw new Error('No cards found with the provided IDs.');
          }
  
          // Update user's deck to include the new card documents
          const updatedUser = await User.findOneAndUpdate(
              { _id: contextValue.result, "decks._id": args.deckId },
              { $push: { "decks.$.cards": { $each: cardsToAdd } } },
              { new: true } // This option returns the modified document
          );
  
          if (!updatedUser) {
              throw new Error('User or deck not found.');
          }
  
          payload.id = updatedUser._id;
          payload.username = updatedUser.username;
          payload.decks = updatedUser.decks;
          return payload;
  
      } catch (error) {
          console.log(error);
  
          payload.error.message = "An error has occurred";
          payload.error.error = true;
          return payload;
      }
  },  

    removeCards: async (parent, args, contextValue) => {
      const payload = {
          id: null,
          username: null,
          decks: null,
          error: { message: "Removed cards", error: false },
      };
  
      try {
          if (contextValue.error) {
              payload.error.message = "Could not authenticate user";
              payload.error.error = true;
              return payload;
          }
  
          
          const result = await User.updateOne(
              { _id: contextValue.result, "decks._id": args.deckId },
              { $pull: { "decks.$.cards": { _id: { $in: args.cardIds } } } }
          );
  
          if (result.modifiedCount === 0) {
              payload.error.message = "No cards removed (deck or cards not found)";
              payload.error.error = true;
              return payload;
          }
  
          
          const updatedUser = await User.findById(contextValue.result);
  
          payload.id = updatedUser.id;
          payload.username = updatedUser.username;
          payload.decks = updatedUser.decks;
          return payload;
  
      } catch (error) {
          console.log(error);
          payload.error.message = "An error has occurred";
          payload.error.error = true;
          return payload;
      }
  },
  
    
    createDeck: async (parent, args, contextValue) =>{
      const payload = {
        id: null,
        username: null,
        decks: null,
        error: {message: "No error occured", error: false}
      }

      if(contextValue.error){
        payload.error.message = "Could not authorize user";
        payload.error.error = true;
        return payload;
      }

      const user = await User.findById(contextValue.result);
      const newDeck = {deckName: args.deckName, cards: []}
      user.decks.push(newDeck);
      await user.save();
      
      payload.id = user.id;
      payload.username = user.username;
      payload.decks = user.decks;
      return payload;

    },

    removeDeck: async (parent, args, contextValue) =>{
      const payload = {
        id: null,
        username: null,
        decks: null,
        error: { message: "Successfully removed deck", error: false },
      };
      try{
        if(contextValue.error){
          payload.error.message = "Could not authenticate user"
          payload.error.error = true;
          return payload
        }
        const deckId = new mongoose.Types.ObjectId(args.deckId);
  
  
        const result = await User.updateOne(    
          { _id: contextValue.result }, 
          { $pull: { decks: { _id: deckId } } }
        )

        if(result.modifiedCount === 0){
          payload.error.message = "Could not delete deck"
          payload.error.error = true;
          return payload
        }

        return payload;
      }catch(error){
        payload.error.error = true;
        return payload
      }
    }

  },
};

export { resolvers };
