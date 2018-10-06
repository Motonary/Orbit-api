import React, { Component } from 'react';
import { connect } from 'react-redux'; //{}で囲むと、ライブラリの一部をインポート
import { selectBook } from '../actions';
import { bindActionCreators } from 'redux'

// export default つけない(ただのcomponentではなくcontainerだから)
class BookList extends Component {
  renderList() {
    return this.props.books.map((book) => {
      return (
        <li
          key={book.title}
          onClick={() => this.props.selectBook(book)}
          className='list-group-item'
        >
          {book.title}
        </li>
      );
    });
  }

  render() {
    return(
      <ul className='list-group col-sm-4'>
        { this.renderList() }
      </ul>
    );
  }
}

// ここでreturnされたものはBookListclass内でpropsとして扱われる.ReactとReduxの接着剤
// TODO(Sunny): returnが()ではなく{}なのはなぜ？
function mapStateToProps(state) {
  return {
    books: state.books
  };
}

// selectBookがpropsとして使えるようになる
function mapDispatchToProps(dispatch) {
  // ActionのselectBookが呼ばれるとreducerに結果が渡される
  return bindActionCreators({ selectBook: selectBook }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
