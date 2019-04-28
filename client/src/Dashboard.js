import React from 'react';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'

import withAuth from './withAuth'

function Dashboard() {
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
            <Card>
              <Card.Body>
                <Card.Title>Current temperature</Card.Title>
                <Card.Text>
                  Current temp is
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>

            <Card>
              <Card.Body>
                <Card.Title>Current humidity</Card.Title>
                <Card.Text>
                  Current humidity is
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </div>
  );
}

export default withAuth(Dashboard)