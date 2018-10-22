import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import promise from 'redux-promise'
import reducers from './reducers'
// import Main from './components/main'
import UserOnly from './components/user_only'
import GuestOnly from './components/guest_only'
import AboutPage from './components/about_page'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

// TODO: v3でいうnested componentのログイン制御v4でもっとうまくやれないのかな？
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <div>
        <Switch>
          <Route path="/guests" component={GuestOnly} />
          <Route path="/users" component={UserOnly} />
          <Route exact path="/" component={AboutPage} />
          <Route render={() => <h2>404 Not Found</h2>} />
        </Switch>
      </div>
    </Router>
  </Provider>
  , document.getElementById('app'))
