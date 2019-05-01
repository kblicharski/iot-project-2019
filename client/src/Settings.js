import React from 'react';

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Collapse from 'react-bootstrap/Collapse'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

import AuthService from './AuthService'
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

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      highTemp: '',
      lowTemp: '',
      highHum: '',
      lowHum: '',
      cricketsToFeed: '',
      lightOnTime: '',
      lightOffTime: '',
      menuOpen: false,
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  
  componentDidMount() {
    let auth = new AuthService()
    let url = `${auth.domain}/app/state`
    
    fetch(
      url,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.getToken()
        }
      }
    )
      .then(auth.checkStatus)
      .then(results => results.json())
      .then((responseJson) => {
        this.setState({
          highTemp: responseJson['high_temp'],
          lowTemp: responseJson['low_temp'],
          highHum: responseJson['high_humidity'],
          lowHum: responseJson['low_humidity'],
          cricketsToFeed: responseJson['crickets_to_feed'],
          lightOnTime: (new Date(responseJson['light_on_time'])).toLocaleTimeString('en-US', { hour12: true }),
          lightOffTime: (new Date(responseJson['light_off_time'])).toLocaleTimeString('en-US', { hour12: true }),
        })
      })
  }

  render() {
    const { menuOpen } = this.state;
    return (
      <div>
        <Row className="text-center">
          <Col xs>
            <h3>Settings</h3>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={() => this.setState({ menuOpen: !menuOpen })} className="windows-button smaller-button margin-div">
            Show current settings
            </Button>
            <Collapse in={this.state.menuOpen} timeout={200}>
              <div className="reading-text">
                <ul>
                  <li>High temperature: {this.state.highTemp}</li>
                  <li>Low temperature: {this.state.lowTemp}</li>
                  <li>High humidity: {this.state.highHum}</li>
                  <li>Low humidity: {this.state.lowHum}</li>
                  <li>Crickets to feed: {this.state.crickets_to_feed}</li>
                  <li>Light on time: {this.state.lightOnTime}</li>
                  <li>Light off time: {this.state.lightOffTime}</li>
                </ul>
              </div>
            </Collapse>
          </Col>
        </Row>
        <Row>
          <Col xs>
            <TemperatureForm />
          </Col>
          <Col xs>
            <HumidityForm />
          </Col>
        </Row>
        <br />
        <Row>
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
}

export default withAuth(Settings)