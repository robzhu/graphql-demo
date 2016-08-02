import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import {authors, books} from './db';
import authorType from './authorType';
import bookType from './bookType';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'QueryRoot',
    fields: {
      authors: {
        type: new GraphQLList(authorType),
        resolve: _ => {
          return authors;
        }
      },
      books: {
        type: new GraphQLList(bookType),
        resolve: _ => {
          return books;
        }
      }
    }
  }),
});

export default schema;
