import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import withAuth from './withAuth'
import Header from './Header'
import Dashboard from './Dashboard';
import Settings from './Settings';

/*
The entire page (for any given page).

For help with routing, go here: https://blog.pshrmn.com/entry/simple-react-router-v4-tutorial/
*/

function App() {
  return (
    <Container fluid="true"  className="root-container app-container">
      <div className="windows-mainbox">
        <Row>
          <Col>
            <div className="windows-bar">
              <img src="http://i63.tinypic.com/117hi0p.png" width="18" height="18" class="windows-bar-image" />
              <p class="windows-bar-text">Auto Terrarium</p>
              <button className="windows-bar-button">X</button>
              <button className="windows-bar-button">?</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col xs>
            <div className="windows-body main-body">
              <main>
                <Switch>
                  <Route exact path='/' component={Dashboard}/>
                  <Route path='/dashboard' component={Dashboard}/>
                  <Route path='/settings' component={Settings}/>
                </Switch>
              </main>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default withAuth(App);