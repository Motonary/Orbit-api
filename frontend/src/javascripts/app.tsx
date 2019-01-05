import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import promise from 'redux-promise'
import reducers from './reducers'
import Main from './components/index/main'
import UserOnly from './components/index/user-only'
import GuestOnly from './components/index/guest-only'

import '../stylesheets/common.scss'
import '../stylesheets/form_field.scss'
import '../stylesheets/top_page.scss'
import '../stylesheets/page_container.scss'
import '../stylesheets/header.scss'
import '../stylesheets/footer.scss'
import '../stylesheets/history_page.scss'
import '../stylesheets/setting_page.scss'
import '../stylesheets/flash.scss'

const createStoreWithMiddleware: any = applyMiddleware(promise)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <Main>
        <Switch>
          <Route path="/guests" component={GuestOnly} />
          <Route path="/users" component={UserOnly} />
          <Route exact path="/" render={() => <Redirect to="/guests" />} />
          <Route render={() => <h2>404 Not Found</h2>} />
        </Switch>
      </Main>
    </Router>
  </Provider>,
  document.getElementById('app')
)
