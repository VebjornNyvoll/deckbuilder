import {User} from "./models/User.js";
import { Authenticate } from "./helpers/authentication.js";

const resolvers = {
    Query: {
      user: async (parent, args) => await User.findById(args.id),
      users: async (parent, args) => await User.find({})
    },
    Mutation: {
        createUser: async (parent, args) => {
            console.log(args);
            console.log(args.password);
            
            const password = await Authenticate.hash(args.password);
            if(password.error){
                return {message: "An error has occured", error: true}
            }else{
                const newUser = new User({username: args.username, password: password.result, decks: []})
                await newUser.save();
                return newUser;
            }
            
        } 

    }
  };
  
export { resolvers };