import React from 'react';

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'

function Dashboard() {
  return (
    <div>
      <Row>
        <h1>Dashboard</h1>
      </Row>
      <Row>
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
      </Row>
    </div>
  );
}

export default Dashboard;