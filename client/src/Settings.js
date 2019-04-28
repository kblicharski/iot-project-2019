import React from 'react';

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import withAuth from './withAuth';
import TemperatureForm from './TemperatureForm'
import HumidityForm from './HumidityForm'
import FeedingForm from './FeedingForm'

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
        <h1>Settings</h1>
      </Row>
      <Row>
        <Col sm>
          <TemperatureForm />
        </Col>
        <Col sm>
          <HumidityForm />
        </Col>
        <Col sm>
          <FeedingForm />
        </Col>
      </Row>
    </div>
  )
}

export default withAuth(Settings);