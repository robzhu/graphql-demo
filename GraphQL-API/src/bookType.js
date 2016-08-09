import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import {authors, books} from './db';
import authorType from './authorType';

const bookType = new GraphQLObjectType({
  name: 'Book',
  description: 'Words on a page, tells a story.',
  fields:() => ({
    id: {type: GraphQLString},
    title: {type: GraphQLString},
    image: {type: GraphQLString},
    authorId: {type: GraphQLString},
    description: {type: GraphQLString},
    author: {
      type: authorType,
      resolve: (book) => {
        return authors[book.authorId];
      }
    }
  }),
});

export default bookType;
