import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./models/typeDef.js";
import { env } from "./helpers/env.js";
import { connect } from "mongoose";
import { Authenticate } from "./helpers/authentication.js";

run().catch((err) => console.log(err));
async function run() {
  await connect(env.MONGOOSE_URI);
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: env.PORT },
  context: async ({ req, res }) => {
    const token = req.headers.authorization || "";
    const user = await Authenticate.getUserIdFromToken(token);
    return user;
  },
});

console.log(`🚀  Standalone server ready at: ${url}`);
