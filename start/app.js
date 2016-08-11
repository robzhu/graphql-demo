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
  console.log('ready');
});
