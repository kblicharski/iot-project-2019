import React from 'react'

import Card from 'react-bootstrap/Card'

import AuthService from './AuthService'

class LightCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lightStatus: '',
      lightOnTime: '',
      lightOffTime: ''
    }
    this.componentDidMount= this.componentDidMount.bind(this)
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
          lightStatus: (responseJson['light'] == 'true' ? 'On' : 'Off'),
          lightOnTime: (new Date(responseJson['light_on_time'])).toLocaleTimeString('en-US', { hour12: true }),
          lightOffTime: (new Date(responseJson['light_off_time'])).toLocaleTimeString('en-US', { hour12: true })
        })
      })
  }

  render() {
    return (
      <Card>
        <Card.Header><i className="fas fa-lightbulb"></i> Light</Card.Header>
        <Card.Body className="text-center less-padding">
          <Card.Text>
            <div className="reading-text margin-div">
              {this.state.lightStatus}
            </div>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="footer-text">
          Light on time: {this.state.lightOnTime}
          <br />
          Light off time: {this.state.lightOffTime}
        </Card.Footer>
      </Card>
    )
  }
}

export default LightCard