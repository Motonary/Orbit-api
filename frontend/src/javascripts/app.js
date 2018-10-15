import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import promise from 'redux-promise'
import reducers from './reducers'
import LoginForm from './components/login_form'
import SignupForm from './components/signup_form'
import UserShow from './components/user_show'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/users/:id" component={UserShow} />
          <Route path="/signup" component={SignupForm} />
          <Route path="/login" component={LoginForm} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('app'))
