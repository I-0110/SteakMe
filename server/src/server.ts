import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './config/connection.js';

// Import the ApolloServer class
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

// Import the two parts of a GraphQL schema
import { typeDefs, resolvers } from './schemas/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {

  await server.start();
  await db();

  const PORT = process.env.PORT || 3001;
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // GraphQL endpoint
  app.use('/graphql', expressMiddleware(server));

  // Serve React (Vite) frontend in production
  const clientPath = path.join(__dirname, '../../client/dist');
  app.use(express.static(clientPath));

  // All other routes => React app
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
  });

  app.listen(PORT, () => {
    console.log(`🌍 Server ready at http://localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

// Call the async function to start the server
startApolloServer();
