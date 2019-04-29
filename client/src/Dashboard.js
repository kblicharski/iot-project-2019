import React from 'react';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardGroup from 'react-bootstrap/CardGroup'

import withAuth from './withAuth'
import CurrentTempCard from './CurrentTempCard'
import CurrentHumCard from './CurrentHumCard'
import LastFeedingCard from './LastFeedingCard'

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
            <LastFeedingCard />
          </Col>
          <Col>
            <CurrentTempCard />
          </Col>
          <Col>
            <CurrentHumCard />
          </Col>
        </Row>
      </div>
    );
  }
}

export default withAuth(Dashboard)