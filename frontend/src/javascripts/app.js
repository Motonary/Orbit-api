import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import promise from 'redux-promise'
import reducers from './reducers'
import LoginForm from './components/login_form'
import SignupForm from './components/signup_form'
import UserShow from './components/user_show'
import Auth from './components/auth'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <div>
        <Switch>
          <Route path="/signup" component={SignupForm} />
          <Route path="/login" component={LoginForm} />
          <Auth>
            <Switch>
              <Route path="/users/:id" component={UserShow} />
            </Switch>
          </Auth>
        </Switch>
      </div>
    </Router>
  </Provider>
  , document.getElementById('app'))
