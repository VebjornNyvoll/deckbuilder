import { User } from "./models/User.js";
import { Authenticate } from "./helpers/authentication.js";

const resolvers = {
  Query: {
    user: async (parent, args) => await User.findById(args.id),
    users: async (parent, args) => await User.find({}),
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
        return newUser;
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
  },
};

export { resolvers };
