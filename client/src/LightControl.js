import React from 'react';

import Card from 'react-bootstrap/Card'

import AuthService from './AuthService'
import withAuth from './withAuth';

class LightControl extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selection: 'turnOn',
      message: '',
    }
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();

    let auth = new AuthService()
    let url = `${auth.domain}/light`

    let lightVal = (this.state.selection === 'turnOn') ? true : false

    return fetch(
      url, 
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.getToken()
        },
        body: JSON.stringify({
          on: lightVal.toString()
        })
      }
    )
      .then(auth.checkStatus)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          message: "feed started"
        })
      })
  }

  handleOptionChange(event) {
    this.setState(
      {selection: event.target.value},
    )
  }

  render() {
    return(
      <Card>
        <Card.Header>Control light</Card.Header>
        <Card.Body>
          <Card.Text className="text-center">
            {this.state.message}
            <form onSubmit={this.handleSubmit}>
              <label>
                <input
                  type="radio"
                  value="turnOn"
                  checked={this.state.selection === 'turnOn'}
                  onChange={this.handleOptionChange}
                />
                Turn on
              </label>
              <label>
                <input
                  type="radio"
                  value="turnOff"
                  checked={this.state.selection === 'turnOff'}
                  onChange={this.handleOptionChange}
                />
                Turn off
              </label>
              <button type="submit" className="windows-button">Set light state</button>
            </form>
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default withAuth(LightControl)