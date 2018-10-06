import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import BookList from './components/book-list';
import BookDetail from './components/book-details';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <div>
      <BookList />
      <BookDetail />
    </div>
  </Provider>
  , document.getElementById('app'));
