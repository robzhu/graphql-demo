# Library REST API
Example of a simple REST API that models the domain of books and authors.

## Clone and install packages
```
git clone https://github.com/robzhu/graphql-demo
cd REST-API
npm i
```

## Dev workflow
This project supports a save/refresh workflow via babel-watch. Run the following command to re-transpile whenever a file is changed and re-start the node process:
```
npm run dev
```

## Routes
```
// Root entrypoint resource:
curl localhost/authors

// Get an author by id
curl localhost/authors/{id}

// Get all books by an author:
curl localhost/authors/{id}/books

// Get all books:
curl localhost/books

// Get a book:
curl localhost/book/{id}
```

Now, edit src/index.js (for example, change the string returned from the default route), save, and refresh your browser to see your chages.
