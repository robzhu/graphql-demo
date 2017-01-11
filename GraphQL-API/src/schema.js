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
      },
      secret: {
        type: GraphQLString,
        resolve: (object, args, context, {rootValue}) => {
          const user = rootValue.user;
          if(!user) {
            return 'only authorized users can know the secret';
          }
          if(user.name === 'admin' && user.pass === '123') {
            return 'howdy admin';
          }
          return 'who are you?';
        }
      }
    }
  }),
});

export default schema;
