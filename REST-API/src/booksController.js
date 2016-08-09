import {authors, books} from './db';
import {toLink as toAuthorLink} from './authorsController';

export function toLink(req, book) {
  return `http://${req.headers.host}/book/${book.id}`;
}

export function toResource(req, book) {
  const author = authors[book.authorId];
  return {
    href: toLink(req, book),
    title: book.title,
    author: toAuthorLink(req, author),
    image: book.image,
    description: book.description,
  }
}

class booksController {
  getBooks(req, res) {
    const bookLinks = books.map(book => {
      return {
        href: toLink(req, book)
      }
    });
    res.send(bookLinks);
  }

  getBook(req, res) {
    const book = books[req.params.id];
    if (!book) {
      res.status(404).send('could not find a book with that id');
    }
    res.send(toResource(req, book));
  }
}

const instance = new booksController;
export default instance;
