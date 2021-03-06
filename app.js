var express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

var app = express();
const PORT = process.env.PORT || 5000;

async function startApolloServer({app}) {
  // Construct a schema, using GraphQL schema language
  const typeDefs = gql`
      type Query {
          hello: String
      }
  `;

// Provide resolver functions for your schema fields
  const resolvers = {
    Query: {
      hello: () => 'Hello world!',
    },
  };
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start()
  server.applyMiddleware({ app });

  app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
}

startApolloServer({ app }).then().catch(e => console.log(`startApolloServer catch - `, e))
