import { User } from "./models/User.js";
import { Authenticate } from "./helpers/authentication.js";
import { Cards } from "./models/Card.js"; 
import { Review } from "./models/Review.js";
import mongoose from "mongoose";
import { error } from "console";
import { GraphQLError } from 'graphql';
const resolvers = {
  Query: {
    user: async (parent, args, contextValue) => {
      if(contextValue.error){
        throw new GraphQLError("Not authenticated")
      }
      const user = await User.findById(contextValue.result);
      if(!user){
        throw new GraphQLError("User could not be found");
      }
      return user;
    },
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
  },

  getReviewsByCardId: async (parent, args) => {
    try{
      const cardId = args.cardId;
      const reviews = await Review.find({ cardId: cardId });
      return reviews;
    }catch(error){
      return error;
    }
  },

  filteredCards: async (parent, args) => {
    const { field, value, gt, lt, sortBy } = args;
    let query = {};

    // If value is provided, perform a string match
    if (value) {
      query[field] = new RegExp(value, 'i'); // Case-insensitive matching
    }

    // If gt or lt is provided, perform numerical comparisons
    if (gt !== undefined || lt !== undefined) {
      query[field] = {};
      if (gt !== undefined) query[field]['$gt'] = gt;
      if (lt !== undefined) query[field]['$lt'] = lt;
    }

    try {
      // Base query with possibility of sorting
      let itemsQuery = Cards.find(query);
      if (sortBy) {
        itemsQuery = itemsQuery.sort({ [sortBy]: 1 }); // 1 for ascending order
      }

      // Execute the query
      const items = await itemsQuery.exec();
      return items;
    } catch (error) {
      console.error(error);
      throw new GraphQLError("Could not fetch items");
    }
  },
  
  },
  Mutation: {
    addReview: async(parent, args, contextValue) => {

      try{
        if(contextValue.error){
         throw "Authenticate user"
        }
        const user = await User.findById(contextValue.result); // Make sure to await this
    
        if (!user) {
          throw new GraphQLError("User not found");
        }
        
        await Review.create({ cardId: args.cardId, text: args.text, rating: args.rating, user: user.toObject() });
        
        return await Review.find({ cardId: args.cardId });
      }catch(error){
        throw new GraphQLError(error);
      }
    },
    
    createUser: async (parent, args) => {
      const outerPayload = {
        token: null,
        error: null,
        user: null,
      }
      const payload = {
        id: null,
        username: null,
        password: null,
        decks: null,
        error: { message: "No error occured", error: false },
      };
      const user = await User.findOne({ username: args.username });
      if (user) {
        throw new GraphQLError("User already exists");
      }

      const password = await Authenticate.hash(args.password);
      if (password.error) {
        throw new GraphQLError("An error has occured");
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
        outerPayload.user = payload;
        const token = Authenticate.createToken(newUser.id);
        
        outerPayload.token = token.result;
        return outerPayload;
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
        throw new GraphQLError("User does not exist");
      }

      const valid = await Authenticate.verify(args.password, user.password);

      if (valid.error) {
        throw new GraphQLError("Invalid password");
      }

      const token = Authenticate.createToken(user.id);
      if (token.error) {
        throw new GraphQLError("Could not create token");
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
            throw new GraphQLError("Could not authorize user");
          }

          // Fetching the card documents that you want to add
          const cardsToAdd = await Cards.find({
              _id: { $in: args.cardIds }
          });
  
          // Validate if cards were found
          if (!cardsToAdd.length) {
            throw new GraphQLError("No cards with the provided ids");
          }

          // Update user's deck to include the new card documents
          const updatedUser = await User.findOneAndUpdate(
              { _id: contextValue.result, "decks._id": args.deckId },
              { $push: { "decks.$.cards": { $each: cardsToAdd } } },
              { new: true } // This option returns the modified document
          );

          if (!updatedUser) {
            throw new GraphQLError("User or deck not found");
          }

          payload.id = updatedUser._id;
          payload.username = updatedUser.username;
          payload.decks = updatedUser.decks;
          return payload;
  
      } catch (error) {
          console.log(error);
  
          throw new GraphQLError("An error has occured");
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
            throw new GraphQLError("Could not authenticate user");
          }
  
          
          const result = await User.updateOne(
              { _id: contextValue.result, "decks._id": args.deckId },
              { $pull: { "decks.$.cards": { _id: { $in: args.cardIds } } } }
          );
  
          if (result.modifiedCount === 0) {
              throw new GraphQLError("No cards removed (deck orcards not found)");
             
          }
  
          
          const updatedUser = await User.findById(contextValue.result);
  
          payload.id = updatedUser.id;
          payload.username = updatedUser.username;
          payload.decks = updatedUser.decks;
          return payload;
  
      } catch (error) {
          console.log(error);
          throw new GraphQLError("An error has occured");
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
        throw new GraphQLError("Could not authorize user");
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
          throw new GraphQLError("Could not authorize user");
        }
        const deckId = new mongoose.Types.ObjectId(args.deckId);
  
  
        const result = await User.updateOne(    
          { _id: contextValue.result }, 
          { $pull: { decks: { _id: deckId } } }
        )

        if(result.modifiedCount === 0){
          throw new GraphQLError("Could not delete deck");
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
