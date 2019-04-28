import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { Router, Route, Switch } from 'react-router-dom'

import history from './history'
import App from './App'
import Login from './Login';

import './style.css'

ReactDOM.render((
  <Router history={history}>
    <Switch>
      <Route exact path='/login' component={Login}/>
      <Route path='/' component={App}/>
    </Switch>
  </Router>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();