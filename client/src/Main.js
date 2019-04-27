import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Col from 'react-bootstrap/Col'

import Home from './Home';
import Login from './Login';
import Settings from './Settings';

/*
For help with routing, go here: https://blog.pshrmn.com/entry/simple-react-router-v4-tutorial/
*/

function Main() {
  return (
    <main>
      <Col>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/settings' component={Settings}/>
        </Switch>
      </Col>
    </main>
  );
}

export default Main;