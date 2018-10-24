import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import promise from 'redux-promise'
import reducers from './reducers'
import Main from './components/index/main'
import UserOnly from './components/users/user-only'
import GuestOnly from './components/guests/guest-only'
import AboutPage from './components/guests/about-page'

import '../stylesheets/style.scss'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <Main>
        <Switch>
          <Route path="/guests" component={GuestOnly} />
          <Route path="/users" component={UserOnly} />
          <Route exact path="/" component={AboutPage} />
          <Route render={() => <h2>404 Not Found</h2>} />
        </Switch>
      </Main>
    </Router>
  </Provider>
  , document.getElementById('app'))
