import React from 'react';

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

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
      <>
        <Row className="text-center">
          <Col xs>
            <h1>Feeding</h1>
          </Col>
        </Row>
        <Row>
          <Col xs>
            <p>The current amount of crickets per feed is: {this.state.crickets_per_feed}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            {this.state.message}
            <form onSubmit={this.handleSubmit}>
              <button type="submit" className="windows-button">Start a feed</button>
            </form>
          </Col>
        </Row>
      </>
    )
  }
}

export default withAuth(Feeding)