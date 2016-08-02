import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import {authors, books} from './db';
import bookType from './bookType';

const authorType = new GraphQLObjectType({
  name: 'Author',
  description: 'The creator of books',
  fields:() => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    image: {type: GraphQLString},
    books: {
      type: new GraphQLList(bookType),
      resolve: (author) => {
        const authorsBooks = books.filter(
          book => book.authorId === author.id
        );
        return authorsBooks;
      }
    }
  }),
});

export default authorType;
