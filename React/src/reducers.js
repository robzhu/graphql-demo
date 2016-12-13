import { combineReducers } from 'redux';

function authors(prevAuthors = [], action) {
  switch (action.type) {
  case 'FETCH_AUTHOR_SUCCESS':
    let newAuthors = prevAuthors.slice();
    newAuthors.push(action.author);
    return newAuthors;
  default:
    return prevAuthors;
  }
}

function booksByAuthor(prevBooks = {}, action) {
  switch (action.type) {
  case 'FETCH_BOOK_SUCCESS':
    const book = action.book;
    const newAuthorBooks = Object.assign({}, prevBooks[action.author.href], {
      [book.title]: book
    });
    return Object.assign({}, prevBooks, {
      [action.author.href]: newAuthorBooks
    });
  default:
    return prevBooks;
  }
}

const rootReducer = combineReducers({
  authors,
  booksByAuthor
});

export default rootReducer;
