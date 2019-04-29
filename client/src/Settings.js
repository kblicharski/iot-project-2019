import React from 'react';

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import withAuth from './withAuth';
import TemperatureForm from './TemperatureForm'
import HumidityForm from './HumidityForm'
import FeedingForm from './FeedingForm'
import LightForm from './LightForm'

/*
A page where the user can choose all the settings for the auto-terrarium system.

Help with forms:
https://blog.logrocket.com/an-imperative-guide-to-forms-in-react-927d9670170a
https://learnetto.com/blog/how-to-do-simple-form-validation-in-reactjs
https://github.com/learnetto/react-form-validation-demo
*/

function Settings() {
  return (
    <div>
      <Row>
        <Col xs>
          <h1>Settings</h1>
        </Col>
      </Row>
      <Row>
        <Col xs>
          <TemperatureForm />
        </Col>
        <Col xs>
          <HumidityForm />
        </Col>
        <Col xs>
          <FeedingForm />
        </Col>
        <Col xs>
          <LightForm />
        </Col>
      </Row>
    </div>
  )
}

export default withAuth(Settings);