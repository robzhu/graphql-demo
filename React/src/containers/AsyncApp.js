import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchAuthors, fetchBooksForAuthor } from '../actions';
import Authors from '../components/Authors';

class AsyncApp extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAuthors());
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, authors } = nextProps;
    if (nextProps.authors !== this.props.authors) {
      nextProps.authors.forEach(author => {dispatch(fetchBooksForAuthor(author));
}
);
    }
  }

  render () {
    const { booksByAuthor, authors } = this.props;
    return (
      <div>
        {authors !== undefined && authors.length > 0 &&
          <div>
            <Authors authors={authors} booksByAuthor={booksByAuthor} />
          </div>
        }
      </div>
    );
  }
}

AsyncApp.propTypes = {
  authors: PropTypes.array,
  booksByAuthor: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { authors, booksByAuthor } = state;
  return {
    authors,
    booksByAuthor
  };
}

export default connect(mapStateToProps)(AsyncApp);
