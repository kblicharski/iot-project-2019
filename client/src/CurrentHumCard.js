import React from 'react';

import Card from 'react-bootstrap/Card'

import AuthService from './AuthService'

class CurrentHumCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      humidity: '',
      updated_at: ''
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
      .then(this.checkStatus)
      .then(results => results.json())
      .then((responseJson) => {
        console.log(responseJson)

        let date = (new Date(responseJson['updated_at'])).toLocaleTimeString()
        this.setState({
          humidity: responseJson['value'],
          updated_at: date
        })
      })
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      let error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Current humidity</Card.Title>
          <Card.Text>
            Current humidity is {this.state.humidity}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Updated at {this.state.updated_at}</small>
        </Card.Footer>
      </Card>
    )
  }
}

export default CurrentHumCard