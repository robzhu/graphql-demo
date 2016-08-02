
function getAuthorId(author) {
  return 'author' + author.name.split(' ').pop();
}

function buildAuthorElement(author) {
  return `
<div class='author' id='${getAuthorId(author)}'>
  <img src='${author.image}'/>
  <div>
    <h2>${author.name}</h2>
  </div>
  <div class='books'>
  </div>
</div>`;
}

function getBookId(book) {
  return 'book' + book.title.split(' ').pop();
}

function buildBookElement(book) {
  return `
<div class='book' id='${getBookId(book)}'>
  <img src='${book.image}'/>
  <div>
    ${book.title}
  </div>
</div>
`;
  return book.title;
}

const API_URL = 'http://api.graphql.tk/authors';
const EVERYTHING_URL = 'http://localhost:3000/everything';

$(document).ready( _ => {
  console.log('document ready');
  //fetchDataV1();
  //fetchDataV2();
  fetchDataV3();
});

function fetchDataV1() {
  $.get(API_URL, authorLinks => {
    authorLinks.forEach(authorLink => {
      $.get(authorLink.href, author => {
        $('#authors').append(buildAuthorElement(author));
        $.get(author.books, books => {
          books.forEach(book => {
            $.get(book.href, bookDocument => {
              const selector = '#' + getAuthorId(author) + ' .books';
              const bookElement = buildBookElement(bookDocument);
              $(selector).append(bookElement);
            });
          });
        });
      })
    });
  });
}

function fetchDataV2() {
  $.get(EVERYTHING_URL, authors => renderRoot(authors));
}

function renderRoot(authors) {
  authors.forEach(author => {
    $('#authors').append(buildAuthorElement(author));
    author.books && author.books.forEach(book => {
      const selector = '#' + getAuthorId(author) + ' .books';
      const bookElement = buildBookElement(book);
      $(selector).append(bookElement);
    })
  });
}

const query = `
{
  authors {
    id
    name
    image
    books {
      id
      image
      title
    }
  }
}
`;

function fetchDataV3() {
  const url = `http://localhost:5000?query=${query}`;
  console.log(url);
  $.get(url, res => {
    console.log(res.data);
    renderRoot(res.data.authors);
  });
}
