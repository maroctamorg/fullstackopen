const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const typeDefs = require("./schema");
const { resolvers } = require("./resolvers");
const { connectToDatabase } = require("./db");

const startServer = async (port, mongoUri) => {
  await connectToDatabase(mongoUri);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port },
  });

  console.log(`Server ready at ${url}`);
};

module.exports = { startServer };
