// *****************************************
// *** Begin Utility functions

function getAuthorId(author) {
  return author.name.split(' ').pop();
}

function buildAuthorElement(author) {
  const id = getAuthorId(author);
  return `
<div class="author" id="${id}">
  <img src="${author.image}"></img>
  <h2>${author.name}</h2>
  <div class="books"></div>
</div>
`;
}

function buildBookElement(book) {
  return `
<div >
  <img src="${book.image}"></img>
  <h2>${book.title}</h2>
</div>
`;
}

function appendAuthor(author) {
  const authorElement = buildAuthorElement(author);
  $('#authors').append(authorElement);
}

function appendBook(book, author) {
  const authorId = getAuthorId(author);
  const bookElement = buildBookElement(book);
  $(`#${authorId} .books`).append(bookElement);
}

// *** End Utility functions
// *****************************************

$(document).ready(()=> {
  fetchData();
  //fetchEverything();
  //fetchGraphQL();
});

function fetchData() {
  const url = 'http://api.graphql.tk/authors';
  $.get(url, authorLinks => {
    authorLinks.forEach(authorLink => {
      $.get(authorLink.href, authorRes => {
        appendAuthor(authorRes);
        $.get(authorRes.books, booksLinks => {
          booksLinks.forEach(bookLink => {
            $.get(bookLink.href, bookRes => {
              appendBook(bookRes, authorRes);
            });
          })
        });
      });
    });
  });
}

function fetchEverything() {
  const url = 'http://api.graphql.tk/everything';
  $.get(url, everything => {
    //console.log(everything);
    render(everything);
  });
}

function render(authors) {
  authors.forEach(author => {
    appendAuthor(author);
    author.books.forEach(book => {
      appendBook(book, author);
    });
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
      title
      image
    }
  }
}
`;

function fetchGraphQL() {
  //const url = 'http://graph.graphql.tk/?query=%7B%0A%20%20authors%20%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%20%20image%0A%20%20%20%20books%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20title%0A%20%20%20%20%20%20image%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D';
  const url = `http://graph.graphql.tk/?query=${query}`

  $.get(url, res => {
    render(res.data.authors);
  });
}
