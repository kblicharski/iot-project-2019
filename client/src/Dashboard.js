import React from 'react';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import withAuth from './withAuth'
import CurrentTempCard from './CurrentTempCard'
import CurrentHumCard from './CurrentHumCard'
import LastFeedingCard from './LastFeedingCard'
import LightCard from './LightCard'
import CurrentFeedingCard from './CurrentFeedingCard'

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col className="text-center">
            <h3>Current stats</h3>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            <CurrentFeedingCard />
            <LastFeedingCard />
            <LightCard />
          </Col>
          <Col>
            <CurrentTempCard />
            <CurrentHumCard />
          </Col>
        </Row>
      </div>
    );
  }
}

export default withAuth(Dashboard)