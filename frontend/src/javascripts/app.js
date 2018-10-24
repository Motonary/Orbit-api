import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import promise from 'redux-promise'
import reducers from './reducers'
import Main from './components/main'
import AboutPage from './components/about_page'
import UserOnly from './components/user_only'
import GuestOnly from './components/guest_only'
import TopPage from './components/top_page'

import '../stylesheets/common.scss'
import '../stylesheets/top_page.scss'
import '../stylesheets/project_page.scss'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <Main>
        <Switch>
          <Route path="/guests" component={GuestOnly} />
          <Route path="/users" component={UserOnly} />
          <Route exact path="/" component={TopPage} />
          <Route render={() => <h2>404 Not Found</h2>} />
        </Switch>
      </Main>
    </Router>
  </Provider>
  , document.getElementById('app'))
