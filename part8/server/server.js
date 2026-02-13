const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const jwt = require("jsonwebtoken");

const { resolvers } = require("./resolvers");
const { connectToDatabase } = require("./db");
const typeDefs = require("./schema");
const User = require("./models/user");

const getUserFromAuthHeader = async (auth, jwtSecret) => {
  if (!auth || !auth.startsWith("Bearer ")) {
    return null;
  }

  const decodedToken = jwt.verify(auth.substring(7), jwtSecret);
  return User.findById(decodedToken.id);
};

const startServer = async (port, mongoUri, jwtSecret) => {
  await connectToDatabase(mongoUri);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port },
    context: async ({ req }) => {
      const auth = req.headers.authorization;
      const currentUser = await getUserFromAuthHeader(auth, jwtSecret);
      return { currentUser };
    },
  });

  console.log(`Server ready at ${url}`);
};

module.exports = { startServer };
