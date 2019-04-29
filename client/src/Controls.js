import React from 'react';

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import withAuth from './withAuth';
import Feeding from './Feeding'
import LightControl from './LightControl';

class Controls extends React.Component {
  render() {
    return(
      <Row>
        <Col xs>
          <Feeding />
        </Col>
        <Col xs>
          <LightControl />
        </Col>
      </Row>
    )
  }
}

export default withAuth(Controls)