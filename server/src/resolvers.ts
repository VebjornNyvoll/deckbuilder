import { User } from "./models/User.js";
import { Authenticate } from "./helpers/authentication.js";
import { Cards } from "./models/Card.js"; 
const resolvers = {
  Query: {
    user: async (parent, args) => await User.findById(args.id),
    users: async (parent, args) => await User.find({}),
    cards:  async (parent, args) => await Cards.find({}),
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
      console.log(args);
      
      const payload = {
        id: null,
        username: null,
        decks: null,
        error: { message: "No error occured", error: false },
      };

      try{
        if(contextValue.error){
          payload.error.message = "Could not authorize user!";
          payload.error.error = true;
          return payload
        }
  
        const user = await User.findById(contextValue.result);
        
        const cards = await Cards.find({ _id: { $in: args.cardIds }});
        
        
        const deck = user.decks.find(deck => {
          console.log(deck)
          return deck._id === args.deckId;
        })

        deck.cards.push(...cards);

        await user.save();
        payload.id = user.id;
        payload.username = user.username;
        payload.decks = user.decks;
        return payload;
      }catch(error){
        console.log(error);

        payload.error.message = "An error has occured";
        payload.error.error = true;
        return payload
      }
      
    },

    removeCards: async (parent, args, contextValue) =>{

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

    }



  },
};

export { resolvers };
