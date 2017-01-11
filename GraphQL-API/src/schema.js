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
      },
      bookSearch: {
        type: new GraphQLList(bookType),
        args: {
          keyword: {
            type: GraphQLString,
          }
        },
        resolve: (object, {keyword}, context, info) => {
          return books.filter(book => book.title.includes(keyword));
        }
      }
    }
  }),
});

export default schema;
