
function getAuthorId(author) {
  return 'author' + author.href.split('/').pop();
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
  return 'book' + book.href.split('/').pop();
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

$(document).ready( _ => {
  console.log('document ready');
  $.get('http://api.graphql.tk/authors', authorLinks => {
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
});
