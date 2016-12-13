import fetch from 'isomorphic-fetch';

export function fetchAuthors() {
  return dispatch => {
    dispatch({type: 'REQUEST_AUTHORS'});
    return fetch(`http://rest.graphql.tk/authors`)
      .then(req => req.json())
      .then(json => json.forEach(authorLink => {
        fetch(authorLink.href)
          .then(req => req.json())
          .then(json => dispatch({
            type: 'FETCH_AUTHOR_SUCCESS',
            author: json
          }));
      }));
  }
}

export function fetchBooksForAuthor(authorData) {
  return dispatch => {
    dispatch({type: 'REQUEST_BOOKS'});
    return fetch(authorData.books)
      .then(req => req.json())
      .then(json => json.forEach(bookLink => {
        fetch(bookLink.href)
          .then(req => req.json())
          .then(json => dispatch({
            type: 'FETCH_BOOK_SUCCESS',
            author: authorData,
            book: json
          }));
      }));
  }
}
