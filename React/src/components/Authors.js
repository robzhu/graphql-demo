import React, { PropTypes, Component } from 'react';

export default class Authors extends Component {
  render () {
    return (
      <div>
        {this.props.authors.map((author, i) =>
          <div className='author'>
            <img src={author.image} />
            <div>
              <h2>{author.name}</h2>
            </div>
            {this._renderBooksForAuthor(author)}
          </div>
        )}
      </div>
    );
  }

  _renderBooksForAuthor(author) {
    let bookList = [];
    if (this.props.booksByAuthor && this.props.booksByAuthor[author.href]) {
      bookList = Object.values(this.props.booksByAuthor[author.href]);
    }
    return (
      <div className='books'>
       {bookList.map((book, i) =>
          <div className='book'>
            <img src={book.image} />
            <div>
              {book.title}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Authors.propTypes = {
  authors: PropTypes.array.isRequired,
  booksByAuthor: PropTypes.object
};
