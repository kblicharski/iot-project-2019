import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import withAuth from './withAuth'
import Header from './Header'
import Home from './Home';
import Dashboard from './Dashboard';
import Settings from './Settings';

/*
The entire page (for any given page).

For help with routing, go here: https://blog.pshrmn.com/entry/simple-react-router-v4-tutorial/
*/

function App() {
  return (
    <Container>
      <Row>
        <Header />
      </Row>
      <Row>
        <main>
          <Col>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/dashboard' component={Dashboard}/>
              <Route path='/settings' component={Settings}/>
            </Switch>
          </Col>
        </main>
      </Row>
    </Container>
  );
}

export default withAuth(App);