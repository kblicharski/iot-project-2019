import React from 'react';

import Card from 'react-bootstrap/Card'

import AuthService from './AuthService'

class CurrentHumCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      humidity: '',
      created_at: ''
    }
    this.componentDidMount= this.componentDidMount.bind(this)
  }
  
  componentDidMount() {
    let auth = new AuthService()
    let url = `${auth.domain}/humidities/most_recent`

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
          humidity: responseJson['value'],
          created_at: (new Date(responseJson['created_at'])).toLocaleString('en-US', { hour12: true })
        })
      })
  }

  render() {
    return (
      <Card>
        <Card.Header><i class="fas fa-tint"></i> Humidity</Card.Header>
        <Card.Body>
          <Card.Text className="text-center">
            <div className="reading-text">
              {this.state.humidity}%
            </div>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="footer-text">
          Last updated at {this.state.created_at}
        </Card.Footer>
      </Card>
    )
  }
}

export default CurrentHumCard