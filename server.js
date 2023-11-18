const express = require("express");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { graphqlHTTP } = require("express-graphql");
const { loadFilesSync } = require("@graphql-tools/load-files");

const typesArray = loadFilesSync("**/*", {
  extensions: ["graphql"],
});
const schema = makeExecutableSchema({
  typeDefs: typesArray,
});
const root = {
  products: require("./products/products.model"),
  orders: require("./orders/orders.model")
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(3000, () => console.log("Running GraphQL server...."));
