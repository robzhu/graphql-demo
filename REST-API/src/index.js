import express from 'express';
import cors from 'cors';
import authorsController from './authorsController';
import booksController from './booksController';

const app = express();
app.use(cors());

app.set('json spaces', 2);

app.get('/authors', authorsController.getAuthors);
app.get('/author/:id', authorsController.getAuthor);
app.get('/author/:id/books', authorsController.getBooksByAuthor);

app.get('/books', booksController.getBooks);
app.get('/book/:id', booksController.getBook);

const port = process.env.NODE_ENV ? 80 : 3000;

app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
