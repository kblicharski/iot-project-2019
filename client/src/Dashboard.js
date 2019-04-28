import React from 'react';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardGroup from 'react-bootstrap/CardGroup'

import withAuth from './withAuth'
import CurrentTempCard from './CurrentTempCard'
import CurrentHumCard from './CurrentHumCard'

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <h1>Dashboard</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <CardGroup>
              <CurrentTempCard />
              <CurrentHumCard />
            </CardGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withAuth(Dashboard)