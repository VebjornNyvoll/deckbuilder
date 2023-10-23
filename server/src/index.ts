import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {resolvers} from "./resolvers.js";
import {typeDefs} from "./models/typeDef.js";
import {connect} from "mongoose";


run().catch(err => console.log(err));
async function run() {
  await connect('mongodb://127.0.0.1:27017/Hearthstone');
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});
  
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
  
console.log(`🚀  Server ready at: ${url}`);