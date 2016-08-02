import express from 'express';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import schema from './schema';

const app = express();
app.use(cors());

app.use('/', graphqlHTTP({schema: schema, pretty: true, graphiql: true}));

const port = process.env.NODE_ENV ? 80 : 5000;

app.listen(port, () => {
  console.log(`app started on port ${port}`);
});

// once app is started, execute queries like so:
// curl localhost:5000 -d "query={authors{id,name, books{id}}}"
