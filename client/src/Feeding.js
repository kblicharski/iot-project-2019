import React from 'react';

import Card from 'react-bootstrap/Card'

import AuthService from './AuthService'
import withAuth from './withAuth';

class Feeding extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      crickets_per_feed: 0,
      message: '',
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    let auth = new AuthService()
    let url = `${auth.domain}/`

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
          test: {}
        }),
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

  render() {
    return(
      <Card>
        <Card.Header>Start a feeding</Card.Header>
        <Card.Body>
          <Card.Text className="text-center">
            <p>The current amount of crickets per feed is: {this.state.crickets_per_feed}</p>
            {this.state.message}
            <form onSubmit={this.handleSubmit}>
              <button type="submit" className="windows-button">Start a feed</button>
            </form>
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default withAuth(Feeding)