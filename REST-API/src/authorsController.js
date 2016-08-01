import _ from 'lodash';
import {authors, books} from './db';
import {toResource as toBookResource} from './booksController';

export function toLink(req, author) {
  return `http://${req.headers.host}/author/${author.id}`;
}

export function toResource(req, author) {
  const href = toLink(req, author)
  return {
    href,
    name: author.name,
    books: `${href}/books`,
    image: author.image,
  }
}

class authorsController {

  getAuthors(req, res) {
    const authorRefs = authors.map(
      author => {
        return {
          href: toLink(req, author)
        };
      }
    );
    res.send(authorRefs);
  }

  getAuthor(req, res) {
    const author = authors[req.params.id];
    if (!author) {
      res.status(404).send('no author with that id found');
    }
    res.send(toResource(req, author))
  }

  getBooksByAuthor(req, res) {
    const authorId = Number(req.params.id);
    const booksByAuthor = books.filter(book => book.authorId === authorId);
    res.send(booksByAuthor.map(
      book => toBookResource(req, book)
    ));
  }
}

const instance = new authorsController();
export default instance;
