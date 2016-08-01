import {authors, books} from './db';
import {toResource as toBookResource} from './booksController';
import {toLink as toBookLink} from './booksController';
import {toResource as toAuthorResource} from './authorsController';

class everythingController {
  getEverything(req, res) {
    const authorResources = authors.map(author => {
      const resource = toAuthorResource(req, author);
      const booksByAuthor = books.filter(book => book.authorId === author.id);
      resource.books = booksByAuthor.map(
        book => {
          // return {
          //   href: toBookLink(req, book)
          // };

          return toBookResource(req, book);
        }
      );
      return resource;
    });
    return res.send(authorResources);
  }
}

const instance = new everythingController();
export default instance;
