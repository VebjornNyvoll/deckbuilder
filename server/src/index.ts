import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './resolvers';
import { typeDefs } from './models/typeDef';
import { env } from './helpers/env';
import { connect } from 'mongoose';
import { Authenticate } from './helpers/authentication';

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
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const user = await Authenticate.getUserIdFromToken(token);
    return user;
  },
});

console.log(`🚀  Standalone server ready at: ${url}`);
