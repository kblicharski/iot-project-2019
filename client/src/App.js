import React from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Header from './Header'
import Main from './Main'

/*
The entire page (for any given page).
*/

function App() {
  return (
    <Container>
      <Row>
        <Header />
      </Row>
      <Row>
        <Main />
      </Row>
    </Container>
  );
}

export default App;