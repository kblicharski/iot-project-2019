import React from 'react';

import Card from 'react-bootstrap/Card'

import AuthService from './AuthService'

class CurrentTempCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      temp1: '',
      temp1CreatedAt: '',
      temp2: '',
      temp2CreatedAt: '',
    }
    this.componentDidMount= this.componentDidMount.bind(this)
  }
  
  componentDidMount() {
    let auth = new AuthService()
    let url = `${auth.domain}/temperatures/most_recent`

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
        let newState = {}
        for (let i = 0; i < responseJson.length; i++) {
          newState[('temp' + (i+1).toString())] = responseJson[i]['value']
          newState[('temp' + (i+1).toString() + 'CreatedAt')] = (new Date(responseJson[i]['created_at'])).toLocaleString('en-US', { hour12: true })
        }
        this.setState(newState)
      })
  }

  render() {
    return (
      <Card>
        <Card.Header><i class="fas fa-thermometer-half"></i> Temperature</Card.Header>
        <Card.Body>
          <Card>
            <Card.Header className="card-header-small">Sensor 1</Card.Header>
            <Card.Body>
              <Card.Text className="text-center">
                <div className="reading-text">
                  {this.state.temp1}°F
                </div>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="footer-text">
              Last updated at {this.state.temp1CreatedAt}
            </Card.Footer>
          </Card>
          <Card>
            <Card.Header className="card-header-small">Sensor 2</Card.Header>
            <Card.Body>
              <Card.Text className="text-center">
                <div className="reading-text">
                  {this.state.temp2}°F
                </div>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="footer-text">
              Last updated at {this.state.temp2CreatedAt}
            </Card.Footer>
          </Card>
          <Card>
            <Card.Header className="card-header-small">Sensor 3</Card.Header>
            <Card.Body>
              <Card.Text className="text-center">
                <div className="reading-text">
                  {this.state.temp3}°F
                </div>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="footer-text">
              Last updated at {this.state.temp3CreatedAt}
            </Card.Footer>
          </Card>
          <Card>
            <Card.Header className="card-header-small">Sensor 4</Card.Header>
            <Card.Body>
              <Card.Text className="text-center">
                <div className="reading-text">
                  {this.state.temp4}°F
                </div>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="footer-text">
              Last updated at {this.state.temp4CreatedAt}
            </Card.Footer>
          </Card>

        </Card.Body>
      </Card>
    )
  }
}

export default CurrentTempCard
